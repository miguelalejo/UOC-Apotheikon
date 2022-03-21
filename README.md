# CIFRAS DE LAS CONTRATACIONES PÚBLICAS POR EMERGENCIA EN ECUADOR


URL Visualización:

https://bvnyn.csb.app/

URL Proyecto GIT:

https://github.com/miguelalejo/UOC-A9-ProyectoVisualizacion

URL Proyecto Preprocesamiento:

https://colab.research.google.com/drive/1yzDQML5AEvR-eMD4roI-4zYXwd9WhfWU?usp=sharing

URL contenedor web público:

https://codesandbox.io/s/uoc-visualizacion-casos-corrupcion-bvnyn


## Créditos

La actividad ha sido realizada de manera individual por **Miguel Alejandro Ponce**.

## Justificación
En el Ecuador existen una serie de políticas, leyes y normas enfocados en la lucha contra la corrupción respecto de las compras realizadas entre instituciones públicas y empresas privadas o personas naturales; según lo establecido en la Ley Orgánica del Sistema Nacional de Contratación Pública (LOSNCP), el Servicio Nacional de Contratación Pública (Sercop), es la entidad rectora del Sistema Nacional de Contratación Pública, responsable de desarrollar y administrar el Sistema Oficial de Contratación Pública del Ecuador y de establecer las políticas y condiciones de la contratación pública a nivel nacional. Durante la última década, el gobierno de Ecuador ha estado rodeado de corrupción, fraude empresarial y desempleo. Realmente creo que luchar contra la corrupción puede ayudar a mi país a alcanzar la igualdad entre los ciudadanos ecuatorianos. Este deseo de resolver la desigualdad me animó a seleccionar el presente conjunto de datos, que una vez realizado el análisis de las fuentes se pueden identificar las siguientes limitaciones que enfrentan los Científicos de Datos y el público en general al intentar tratar estas fuentes:
* Los datos que se encuentran en los portales públicos tiene diferentes formatos, los repositorios están desactualizados, sus accesos vía web no están disponibles o no existen.
* No existen visualizaciones que cuenten historias entre las relaciones entre las personas de las empresas, marcas atípicas respecto de los contratos de orden público.
* Existe un degaste de tiempo al acceder y procesar la información puede ser muy tedios el integrar varias fuentes de datos.
* Los índices de precios de los productos desde la oferta no son comparables contra las ofertas realizadas en los contratos y por tanto muchas de las veces están por encima de los precios del mercado
* Existen errores u omisiones en los propios documentos generados como reportes de las instituciones que deben reportar esta información. Luego al no estar los datos en línea se produce un efecto de congelamiento de datos cuya extracción posterior imposibilita mecanismos efectivos para combatir la corrupción.


## Visualización
Debido a que no existe una herramienta de visualización accesible para todo público que integre la información de los datos que permita combatir la corrupción y que permita la interacción y retro alimentación de la comunidad. Se propone realizar una visualización relacionada con el ámbito de contratación pública a nivel nacional durante los meses de pandemia para ciertos insumos en medicina (MASCARILLAS, BOLSAS CADÁVERES, ALCOHOL, PRUEBAS PCR).
Las cuestiones a responder con la visualización son:
* ¿Cuáles son los 10 proveedores del estado para los primeros meses de pandemia tienen un sobre precio en sus productos?
* ¿Cuáles son los porcentajes de los productos más vendidos durante los meses de pandemia que corresponden al tipo catalogado como “EMERGENCIA SANITARIA” (conocido como una de las fuentes comunes de corrupción)?
* ¿Cuáles fueron los tiempos promedios más irregulares para asignación de estos contratos en un periodo de día?
* ¿Cuáles son el top 10 de instituciones públicas las que realizaros mayores gastos en contratos con estos insumos?

## Justificación de la elección del juego de datos
Los datos son actuales debido a que la ley obliga a realizar la publicación de todos los contrataros realizados de manera mensual en un formato Open Contracting (reporte en formato json), estándar internacional para el reportar información contractual relevante. La última fecha de actualización del conjunto de datos es 29 de diciembre de 2021.

El dominio se describe por medio de los siguientes atributos:

    Column                           Non-Null Count  Dtype                                 
---  ------                           --------------  -----                                 
 0   ocid                             35 non-null     object                                
 1   rationale                        35 non-null     object                                
 2   budget_amount                    9 non-null      float64                               
 3   release_id_x                     35 non-null     object                                
 4   status_x                         35 non-null     object                                
 5   contractPeriod_startDate_x       35 non-null     datetime64[ns, pytz.FixedOffset(-300)]
 6   contractPeriod_endDate_x         35 non-null     object                                
 7   contractPeriod_durationInDays_x  35 non-null     float64                               
 8   dateSigned                       35 non-null     object                                
 9   release_id_y                     35 non-null     object                                
 10  description_x                    35 non-null     object                                
 11  status_y                         35 non-null     object                                
 12  procuringEntity_id               35 non-null     object                                
 13  procuringEntity_name             35 non-null     object                                
 14  value_amount                     9 non-null      float64                               
 15  procurementMethodDetails         35 non-null     object                                
 16  tenderPeriod_startDate           35 non-null     object                                
 17  tenderPeriod_endDate             8 non-null      object                                
 18  enquiryPeriod_durationInDays     28 non-null     float64                               
 19  awardPeriod_startDate            26 non-null     object                                
 20  awardPeriod_endDate              35 non-null     object                                
 21  awardPeriod_durationInDays       24 non-null     float64                               
 22  numberOfTenderers                35 non-null     float64                               
 23  release_id_x                     35 non-null     object                                
 24  title                            0 non-null      float64                               
 25  description_y                    35 non-null     object                                
 26  amount                           35 non-null     float64                               
 27  contractPeriod_startDate_y       8 non-null      object                                
 28  contractPeriod_endDate_y         8 non-null      object                                
 29  contractPeriod_durationInDays_y  8 non-null      float64                               
 30  release_id_y                     35 non-null     object                                
 31  award_id                         35 non-null     object                                
 32  id                               35 non-null     object                                
 33  name                             35 non-null     object                                
 34  codigo_empresa                   35 non-null     object                                
 35  tipo_empresa                     35 non-null     object                                
 36  codigo_proveedor                 35 non-null     object                                
 37  tipo_provedor                    35 non-null     object                                
 38  Producto                         35 non-null     object                                
 39  month                            35 non-null     int64                                 
 40  month_name                       35 non-null     object                                
 41  mes_nombre                       35 non-null     object                                


URL de datos abiertos(Licensed under the MIT):
https://datosabiertos.compraspublicas.gob.ec/PLATAFORMA

## Dataset:
Las listas de los archivos cvs con los datos se encuentran en la capeta *raw-data*. En este caso se presentan dos conjuntos de datos. 
El primero corresponde a los datos originales. 
* contratos_proveedor_unidad.xlsx
* releases_2020.xlsx
El segundo es un sub-conjunto de datos luego del proceso de limpieza de datos.
* empresas_codigos.xlsx
* proveedores.xlsx




## Licencia
Los datos estarán bajo la licencia Apache License, Version 2.0. Bajo esta licencia, se liberan los derechos de propiedad intelectual y cualquier usuario puede hacer un uso libre de ella. Somos firmes defensores del software libre y del código abierto, pues consideramos que en un mundo tecnológico cada vez más monopolizado por grandes empresas, ofrecer un trabajo que puede beneficiar a cualquier persona del mundo, es un paso hacia la libertad individual y colectiva.


## Ficheros del código fuente
La solución se encuentra implementada en R, y los archivos de código fuente se encuentran en la ruta *code*.
* **js** Código fuente de con archivos java script de la solución.
* **char-js** Contrucción de los objetos para las visualizaciones en JS.
* **data** Archivos en formato JSON con las fuentes de datos tratados y agregados.
* **css** Hojas de estilo de la visualización.
* **index.html** Página principal de la visualización.
* **notebooks** Note books de la solución.

## Recursos

Otra, L., En, P., & Ecuador, E. (2021). CORRUPCIÓN EN TIEMPOS DE COVID-19: LA OTRA PANDEMIA EN EL ECUADOR. https://odjec.org/wp-content/uploads/2021/04/Corrupcion-y-covid-19.pdf
SISTEMA OFICIAL DE CONTRATACION DEL ESTADO., & (2021, November 29). Listar Archivos JSON. Datosabiertos.compraspublicas.gob.ec.. https://datosabiertos.compraspublicas.gob.ec/OCDS/

Contraloría General del Estado del Ecuador. (2021). Portal Web Oficial de la Contraloría General del Estado del Ecuador. Contraloria.gob.ec. https://www.contraloria.gob.ec/CentralMedios/SalaPrensa/23870

EL COMERCIO. (2020, June 13). Daniel Salcedo deberá responder por la venta de bolsas de cadáveres de $12 a $148. El Universo. https://www.eluniverso.com/noticias/2020/06/13/nota/7870461/salcedo-debera-responder-venta-bolsas-cadaveres-12-148/

Servicio Nacional de Contratación Pública. (2020, August). Sercop regula y controla las contrataciones por Emergencia – Servicio Nacional de Contratación Pública. Servicio Nacional de Contratación Pública. https://portal.compraspublicas.gob.ec/sercop/sercop-regula-y-controla-las-contrataciones-por-emergencia/

SERCOP. (2021, December 29). Datosabiertos. Datosabiertos.compraspublicas.gob.ec. https://datosabiertos.compraspublicas.gob.ec/PLATAFORMA


