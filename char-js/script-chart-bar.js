crearBarraProductoMeses();
async function crearBarraProductoMeses() {
          const response = await fetch(
'https://raw.githubusercontent.com/miguelalejo/UOC-A9-ProyectoVisualizacion/main/data/bar-productos-meses.json');
          console.log(response);
          const data = await response.json();
          console.log(data);
          length = data.length;
          console.log(length);

          labels = [];
          const mapaLabel = new Map();
          for (i = 0; i < length; i++) {
              labels.push(data[i].categorie);
              valores = data[i].values                
              
              for (j = 0; j < valores.length; j++) {                  
                if(!mapaLabel.has(valores[j].rate)){
                  values = [];
                  values.push(valores[j].value);
                  mapaLabel.set(valores[j].rate,values)
                } else{
                  values = mapaLabel.get(valores[j].rate);                    
                  values.push(valores[j].value);
                  mapaLabel.set(valores[j].rate,values)
                }
              }                
          }
          myData = []
          paletaColor = palette('tol', mapaLabel.size).map(function(hex) {return '#' + hex; });
          mapaLabel.forEach((value, key) => {
            var indice = Array.from(mapaLabel.keys()).indexOf(key);
            console.log(indice);
            let obj = {};
            obj['label'] = key;
            obj['data'] = value;
            obj['borderColor'] = paletaColor[indice];
            obj['backgroundColor'] = obtenerPaleta(key);
            myData.push(obj)            
          });
          

         
          new Chart(document.getElementById("bar-chart-productos-meses"), {
          type: 'bar',
          data: {
            labels: labels,
            datasets: myData
          },
          backgroundColor: palette('tol', myData.length).map(function(hex) {
            return '#' + hex;
          }),
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Productos Periodo 2020'
              }
            }
          }
        });
}