crearCharTreeCompradores();
  async function crearCharTreeCompradores() {
            const response = await fetch(
'https://raw.githubusercontent.com/miguelalejo/UOC-A9-ProyectoVisualizacion/main/data/tree-empresas.json');
            console.log(response);
            const data_tree = await response.json();
           
  
            Utils.load(() => {
				const ctx = document.getElementById('chart-area').getContext('2d');
				const tm = window.chart = new Chart(ctx, {
					type: 'treemap',
					data: {
						datasets: [{
							tree: data_tree,
							key: 'montos',
							groups: ['division','region' ,'state','code'],
							spacing: -0.5,
							borderWidth: 0.5,
							borderColor: 'rgba(200,200,200,1)',
							hoverBackgroundColor: 'rgba(220,230,220,0.5)',
							backgroundColor(ctx) {
								const item = ctx.dataset.data[ctx.dataIndex];
								if (!item) {
									return;
								}
								const a = item.v / (item.gs || item.s) / 2 + 0.5;
								switch (item.l) {
								case 0:
									switch (item.g) {
									case 'HOSPITAL': return paletaColorTipoEmpresa[0];
									case 'GOBIERNO DESCENTRALIZADO': return paletaColorTipoEmpresa[1];
									case 'EMPRESA PÚBLICA': return paletaColorTipoEmpresa[2];
									case 'OTROS': return paletaColorTipoEmpresa[3];
									
									case 'REACTIVOS COVID': return paletaColorProducto[0];
									case 'MASCARILLA KN95': return paletaColorProducto[1];
									case 'BOLSAS CADÁVER': return paletaColorProducto[2];
									case 'SERVICIO LABORATORIO': return paletaColorProducto[3];
									case 'PRUEBAS RÁPIDAS': return paletaColorProducto[4];
									case 'PRUEBAS PCR': return paletaColorProducto[5];

									default: return '#e6beff';
									}
								case 1:
									return Chart.helpers.color('white').alpha(0.4).rgbString();
								default:
									return Chart.helpers.color('white').alpha(0.2).rgbString();
								}
							},
							color: "#00000",
							font: {
								family: 'Tahoma',
								size: 12,
								
							},
							hoverFont: {
								family: 'Tahoma',
								size: 14,
								
							}
						}]
					},
					options: {
						maintainAspectRatio: false,
						plugins: {
							title: {
								display: false,
								text: 'Empresas'
							},
							legend: {
								display: false
							},
							tooltip: {
								callbacks: {
									label(item) {
										const dataset = item.dataset;
										const dataItem = dataset.data[item.dataIndex];
										const obj = dataItem._data;
										if(obj.state == dataItem.g ){
											return obj.state
										}
										return dataItem.g + ': ' + dataItem.v;
									}
								}
							}
						}
					}
				});
	
				const sel = document.getElementById('data-key');
				sel.addEventListener('change', () => {
					tm.data.datasets[0].key = sel.value;
					tm.update();
				});
	
				function updateGroups() {
					const groups = tm.data.datasets[0].groups = [];
					let rtl = false;
					document.querySelectorAll('#controls input:checked').forEach((cb) => {
						if (cb.value === 'rtl') {
							rtl = true;
						} else {
							if(cb.value=="code"){
								groups.push('state');	
							}
							groups.push(cb.value);
						}
					});
					tm.data.datasets[0].rtl = rtl;
					tm.update();
				}
				document.querySelectorAll('#controls input[type="checkbox"]').forEach((cb) => {
					cb.addEventListener('change', () => {
						updateGroups();
					});
				});
			});
  }

  crearCharTreeProveedores();
  async function crearCharTreeProveedores() {
	const response = await fetch(
		'https://raw.githubusercontent.com/miguelalejo/UOC-A9-ProyectoVisualizacion/main/data/tree-proveedor.json');
					console.log(response);
					const data_tree = await response.json();
					const data = data_tree;
		  
					Utils.load(() => {
						const ctx = document.getElementById('chart-area-pro').getContext('2d');
						const tm = window.chart = new Chart(ctx, {
							type: 'treemap',
							data: {
								datasets: [{
									tree: data_tree,
									key: 'montos',
									groups: [ 'division','region', 'state','code'],
									spacing: -0.5,
									borderWidth: 0.5,
									borderColor: 'rgba(200,200,200,1)',
									hoverBackgroundColor: 'rgba(220,230,220,0.5)',
									backgroundColor(ctx) {
										const item = ctx.dataset.data[ctx.dataIndex];
										if (!item) {
											return;
										}
										const a = item.v / (item.gs || item.s) / 2 + 0.5;
										switch (item.l) {
										case 0:
											switch (item.g) {
											case 'COMPAÑÍA LIMITADA': return paletaColorProvedorLinea[0];
											case 'PERSONA NATURAL': return paletaColorProvedorLinea[1];
											case 'SOCIEDAD ANÓNIMA': return paletaColorProvedorLinea[2];
											
											
											case 'REACTIVOS COVID': return paletaColorProducto[0];
											case 'MASCARILLA KN95': return paletaColorProducto[1];
											case 'BOLSAS CADÁVER': return paletaColorProducto[2];
											case 'SERVICIO LABORATORIO': return paletaColorProducto[3];
											case 'PRUEBAS RÁPIDAS': return paletaColorProducto[4];
											case 'PRUEBAS PCR': return paletaColorProducto[5];
		
											default: return '#e6beff';
											}
										case 1:
											return Chart.helpers.color('white').alpha(0.4).rgbString();
										default:
											return Chart.helpers.color('white').alpha(0.2).rgbString();
										}
									},
									color: "#00000",
									font: {
										family: 'Tahoma',
										size: 12,
										
									},
									hoverFont: {
										family: 'Tahoma',
										size: 14,
										
									}
								}]
							},
							options: {
								maintainAspectRatio: false,
								plugins: {
									title: {
										display: false,
										text: 'Empresas'
									},
									legend: {
										display: false
									},
									tooltip: {
										callbacks: {
											
											label(item) {
												const dataset = item.dataset;
												const dataItem = dataset.data[item.dataIndex];
												const obj = dataItem._data;
												if(obj.state == dataItem.g ){
													return obj.state
												}
												return dataItem.g + ': ' + dataItem.v;
											}
										}
									}
								}
							}
						});
			
						const sel = document.getElementById('data-key2');
						sel.addEventListener('change', () => {
							tm.data.datasets[0].key = sel.value;
							tm.update();
						});
			
						function updateGroups() {
							const groups = tm.data.datasets[0].groups = [];
							let rtl = false;
							document.querySelectorAll('#controls2 input:checked').forEach((cb) => {
								if (cb.value === 'rtl') {
									rtl = true;
								} else {
									if(cb.value=="code"){
										groups.push('state');	
									}
									groups.push(cb.value);
								}
							});
							tm.data.datasets[0].rtl = rtl;
							tm.update();
						}
						document.querySelectorAll('#controls2 input[type="checkbox"]').forEach((cb) => {
							cb.addEventListener('change', () => {
								updateGroups();
							});
						});
					});
  }



