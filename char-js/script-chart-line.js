 crearCharLineaNroContratos();
  async function crearCharLineaNroContratos() {
            const response = await fetch(
'https://raw.githubusercontent.com/miguelalejo/UOC-A9-ProyectoVisualizacion/main/data/line-nro-contratos-mes.json');
            console.log(response);
            const data = await response.json();
            console.log(data);
            length = data.length;
            console.log(length);
  
            labels = [];
            values = [];
            for (i = 0; i < length; i++) {
                labels.push(data[i].date);
                values.push(data[i].close);
            }
  
            new Chart(document.getElementById("line-chart-nro-contratos"), {
            type: 'line',
            data: {
              labels: labels,
              datasets: [{ 
                  data: values,
                  label: "Nro. Contratos x Mes",
                  borderColor: paletaColorLinea[0],
                  backgroundColor: paletaColorLinea[0],
                  fill: false
                }
              ]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Periodo 2020'
                }
              }
            }
          });
  }
  crearCharLineaMontosContratos();
  async function crearCharLineaMontosContratos() {
            const response = await fetch(
'https://raw.githubusercontent.com/miguelalejo/UOC-A9-ProyectoVisualizacion/main/data/line-monto-contratos-mes.json');
            console.log(response);
            const data = await response.json();
            console.log(data);
            length = data.length;
            console.log(length);
  
            labels = [];
            values = [];
            for (i = 0; i < length; i++) {
                labels.push(data[i].date);
                values.push(data[i].close);
            }
  
            new Chart(document.getElementById("line-chart-montos-contratos"), {
            type: 'line',
            data: {
              labels: labels,
              datasets: [{ 
                  data: values,
                  label: "Montos Contratos x Mes",
                  backgroundColor: paletaColorLinea[1],
                  borderColor: paletaColorLinea[1],
                  fill: false
                }
              ]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Periodo 2020'
                }
              }
            }
          });
  }