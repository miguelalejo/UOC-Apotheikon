# UOC APOTHEIKON


URL Visualización:

https://bvnyn.csb.app/

URL Proyecto GIT:

https://github.com/miguelalejo/UOC-Apotheikon

URL Proyecto Preprocesamiento:



URL contenedor web público:




## Créditos

La actividad ha sido realizada de manera grupal por **Maite Piedra**, **Jordi Alba** y **Miguel Alejandro Ponce**.

## Justificación
Atida | Mifarma es el ecommerce líder en España y Portugal en la venta de productos de parafarmacia y farmacia. Con sede en Albacete y Madrid, más de 10 años de experiencia en el sector y un equipo de más de 120 profesionales, ofrece una experiencia confiable y personalizada antes, durante y después de todo el proceso de compra. La compañía ofrece un amplio catálogo de productos para el cuidado y bienestar a través de un servicio rápido y personalizado respaldado por expertos farmacéuticos.

En el año 2019 Mifarma se unió a Atida con el objetivo de convertirse en la mayor plataforma de salud holística online en Europa. De este modo, trabajan día a día para construir un ecosistema online cuyo objetivo es transformar el panorama de salud y bienestar, convirtiéndose en la farmacia online más grande de Europa y un lugar de referencia al que acudir en busca de información y consejo profesional.

## El objetivo
La comprensión del negocio es esencial para que las empresas puedan conseguir sus objetivos, así como para el desarrollo de sus planes de futuro. La visualización de datos es imprescindible para entender el negocio (clusterización de clientes, paquetización de productos, identificación de zonas de expansión, segmentación comportamental en ventas...).

Te retamos a que crees la mejor aplicación y/o visualización sobre los datos anonimizados facilitados por Atida | Mifarma, con la información de negocio del periodo transcurrido entre el 01/01/2017 y el 31/12/2018. Puedes realizar un cuadro de mando, un ejercicio analítico exploratorio, una infografía, una web, un análisis gráfico avanzado… Sorpréndenos.

## Los datasets

Ponemos a tu disposición 3 datasets con la información necesaria para poder realizar tu proyecto. Todos los ficheros están en formato CSV, separados por comas y usando el punto como indicador decimal en las variables numéricas.

### Dataset 1
El primer dataset “items_ordered_2years.csv” incluye la información de las ventas realizadas a través de la web desde enero de 2017 a diciembre de 2018 en España. Se presentan los datos de los tiques de compra, mostrando las siguientes variables:
NOMBRE	DEFINICION	TIPO
num_order	Identificador de pedido	CATEGÓRICA
item_id	Identificador del objeto	CATEGÓRICA
created_at	Fecha de la compra	TEMPORAL
product_id	Identificador del producto	CATEGÓRICA
qty_ordered	Número de productos en el pedido	NUMÉRICA
base_cost	Precio base	NUMÉRICA
price	Precio de venta	NUMÉRICA
discount_percent	Descuento aplicado	NUMÉRICA
customer_id	Identificador del cliente	CATEGÓRICA
city	Municipio del cliente	CATEGÓRICA
zipcode	Código postal del cliente	CATEGÓRICA

### Dataset 2
Por su parte, el segundo dataset “products.csv” presenta la información del catálogo de productos disponible en la web. Incluye las siguientes variables de cada producto:

NOMBRE	DEFINICION	TIPO
product_id	Identificador del producto	CATEGÓRICA
sku	Código del producto	CATEGÓRICA
name	Nombre del producto	CATEGÓRICA
marca_value	Marca del producto	CATEGÓRICA
short_description	Descripción del producto	CATEGÓRICA
analytic_category	Categoría del producto	CATEGÓRICA
picture	Url con la imagen del producto	CATEGÓRICA

### Dataset 3
Por último, el tercer dataset “products_cat.csv”, contiene la clasificación de los productos a distintos niveles, presentando las siguientes variables:

NOMBRE	DEFINICION	TIPO
sku	Código del producto	CATEGÓRICA
cat1	Categorización primer nivel	CATEGÓRICA
cat2	Categorización segundo nivel	CATEGÓRICA
cat3	Categorización tercer nivel	CATEGÓRICA



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

