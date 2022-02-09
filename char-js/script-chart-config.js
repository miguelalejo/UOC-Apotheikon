 function hexToRGB(hex, alpha) {
              var r = parseInt(hex.slice(1, 3), 16),
                  g = parseInt(hex.slice(3, 5), 16),
                  b = parseInt(hex.slice(5, 7), 16);
          
              if (alpha) {
                  return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
              } else {
                  return "rgb(" + r + ", " + g + ", " + b + ")";
              }
          }
function obtenerPaleta(item) {          
         
            switch (item) {
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
               
        }
paletaColorLinea = palette('cb-Set2', 5).map(function(hex) {
              return hexToRGB('#' +hex,0.5); });

paletaColorProvedor = palette('cb-Dark2', 3).map(function(hex) {                
                return hexToRGB('#' +hex,0.5); });

paletaColorProvedorLinea = palette('cb-Dark2', 3).map(function(hex) {                
                    return hexToRGB('#' +hex,1); });

paletaColorTipoEmpresa = palette('cb-Accent', 4).map(function(hex) {                
                        return hexToRGB('#' +hex,0.5); });
                    
paletaColorProducto = ['rgb(25, 135, 84)','rgb(220, 53, 69)','rgb(255, 193, 7)','rgba(30, 0, 0,0.3)','rgb(91, 202, 240)','rgb(13, 110, 253)']

                   