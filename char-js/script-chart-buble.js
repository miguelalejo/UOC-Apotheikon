 getDataEmpresasProductos();
  async function getDataEmpresasProductos() {
            const response = await fetch(
'https://raw.githubusercontent.com/miguelalejo/UOC-A9-ProyectoVisualizacion/main/data/bubble-empresas-productos.json');
            console.log(response);
            const data = await response.json();
            console.log(data);
            length = data.length;
            console.log(length);
  
            labels_x = [];
            labels_y = [];
            labels = [];
            const mapaLabel = new Map();
            for (i = 0; i < length; i++) {
                categoria = data[i].categorie;
                labels.push(categoria);
                valores = data[i].values 
                dataValues = []         
                for (j = 0; j < valores.length; j++) {                  
                  tipoEmpresa= valores[j].tipo_empresa;
                  tipoProducto= valores[j].Producto;               
                  if(!labels_x.includes(tipoEmpresa)){
                    labels_x.push(tipoEmpresa);
                  }
                  if(!labels_y.includes(tipoProducto)){
                    labels_y.push(tipoProducto);
                  }
                  let obj = {};
                  obj['r'] = valores[j].value;
                  obj['y'] = tipoProducto;
                  obj['x'] = tipoEmpresa;            
                  dataValues.push(obj);                         
                }               
                mapaLabel.set(categoria,dataValues)
            }

            myData = [];
          
          
            paletaColor = palette('cb-Set3', mapaLabel.size).map(function(hex) {
              color = '#' + hex+'ff';
              return hexToRGB('#' +hex,0.5); });
            
            mapaLabel.forEach((value, key) => {
              var indice = Array.from(mapaLabel.keys()).indexOf(key);
              console.log(indice);
              let obj = {};
              obj['label'] = key;
              obj['data'] = value;
              obj['borderColor'] = paletaColorProvedor[indice];
              obj['backgroundColor'] = paletaColorProvedor[indice];                       
              myData.push(obj);          
            });

            var bubbleChartData = {
              animation: {
                duration: 10
              },
              // Documentation says the tick values tick.min & tick.max must be in the Labels array. So thats what I have below
              
              datasets: myData
            };
  
            var ctx = document.getElementById('bubble-mon-productos-empresas');
            var bubble = new Chart(ctx, {
              type: 'bubble',
              data: bubbleChartData,
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Empresas x Productos'
                  }
                },
                  scales: {
                    y: {
                        // will this create y-axis with days of week?
                        type: 'category',
                        labels: labels_y
                    },
                    x: {
                      type: 'category',
                      labels: labels_x
                    }
                  }
                
              }
            });
  }

  getDataEmpresasProductosMontos();
  async function getDataEmpresasProductosMontos() {
            const response = await fetch(
'https://raw.githubusercontent.com/miguelalejo/UOC-A9-ProyectoVisualizacion/main/data/bubble-empresas-contratos.json');
            console.log(response);
            const data = await response.json();
            console.log(data);
            length = data.length;
            console.log(length);
  
            labels_x = [];
            labels_y = [];
            labels = [];
            const mapaLabel = new Map();
            for (i = 0; i < length; i++) {
                categoria = data[i].categorie;
                labels.push(categoria);
                valores = data[i].values 
                dataValues = []         
                for (j = 0; j < valores.length; j++) {                  
                  tipoEmpresa= valores[j].tipo_empresa;
                  tipoProducto= valores[j].Producto;               
                  if(!labels_x.includes(tipoEmpresa)){
                    labels_x.push(tipoEmpresa);
                  }
                  if(!labels_y.includes(tipoProducto)){
                    labels_y.push(tipoProducto);
                  }
                  let obj = {};
                  obj['r'] = valores[j].value;
                  obj['y'] = tipoProducto;
                  obj['x'] = tipoEmpresa;            
                  dataValues.push(obj);                         
                }               
                mapaLabel.set(categoria,dataValues)
            }

            myData = [];
           
            paletaColor = palette('cb-Set3', mapaLabel.size).map(function(hex) {
              color = '#' + hex+'ff';
              return hexToRGB('#' +hex,0.5); });
            
            mapaLabel.forEach((value, key) => {
              var indice = Array.from(mapaLabel.keys()).indexOf(key);
              console.log(indice);
              let obj = {};
              obj['label'] = key;
              obj['data'] = value;
              obj['borderColor'] = paletaColorProvedor[indice];
              obj['backgroundColor'] = paletaColorProvedor[indice];                       
              myData.push(obj);          
            });

            var bubbleChartData = {
              animation: {
                duration: 10
              },
              // Documentation says the tick values tick.min & tick.max must be in the Labels array. So thats what I have below
              
              datasets: myData
            };
  
            var ctx = document.getElementById('bubble-nro-productos-empresas');
            var bubble = new Chart(ctx, {
              type: 'bubble',
              data: bubbleChartData,
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Empresas x Productos'
                  }
                },
                  scales: {
                    y: {
                        // will this create y-axis with days of week?
                        type: 'category',
                        labels: labels_y
                    },
                    x: {
                      type: 'category',
                      labels: labels_x
                    }
                  }
                
              }
            });
  }