# UOC APOTHEIKON

URL Visualización:

https://bvnyn.csb.app/

URL Proyecto GIT:

https://github.com/miguelalejo/UOC-Apotheikon

URL Proyecto Preprocesamiento:



URL contenedor web público:




## Créditos

La actividad ha sido realizada de manera grupal por **Maite Piedra**, **Jordi Bosch** y **Miguel Alejandro Ponce**.

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

