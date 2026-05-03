# Detectives del Estrés Vegetal v1.0.0
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-green)
![Maintained](https://img.shields.io/badge/maintained-yes-brightgreen)

<img src="./src//documents/branding/portada.png" alt="Portada" width="100%"/>

## Índice

1. [Descripción](#descripción)
2. [Objetivo](#objetivo)
3. [Ficha técnica](#ficha-técnica)
4. [Fundamento teórico](#fundamento-teórico)
5. [Pipeline computacional implementado](#pipeline-computacional-implementado)
6. [Limitaciones del Índice Cromático de Vegetación](#limitaciones-del-índice-cromático-de-vegetación)
7. [Requisitos](#requisitos)
8. [Uso de la herramienta](#uso-de-la-herramienta)
9. [Metodología del taller](#metodología-del-taller)
10. [Resultados esperados](#resultados-esperados)
11. [Evidencias](#evidencias)
12. [Consideraciones](#consideraciones)
13. [Recursos](#recursos)
14. [Versionamiento](#versionamiento)
15. [Contribuciones](#contribuciones)
16. [Créditos](#créditos)
17. [Sobre Singularity](#sobre-singularity)

## Descripción

Detectives del Estrés Vegetal es una experiencia formativa interactiva desarrollada por el colectivo Singularity, orientada al análisis del estado de salud de plantas mediante la extracción de valores RGB a partir de imágenes digitales.

A partir de estos datos, se construyen indicadores numéricos inspirados en técnicas de percepción remota y teledetección, como el Índice de Vegetación de Diferencia Normalizada (NDVI), con el propósito de comprender cómo los sistemas computacionales representan el color como información cuantificable.


## Objetivo

Que los participantes comprendan cómo un sistema computacional transforma información visual (color) en datos numéricos (RGB), y cómo estos pueden emplearse para inferir el estado de salud vegetal mediante modelos simplificados de análisis.


## Ficha técnica

- Nombre: Detectives del Estrés Vegetal  
- Duración: 1.5 horas (90 minutos)  
- Lugar: IMJU Parque Hidalgo  
- Participantes: 45 personas  
- Modalidad: Taller práctico con apoyo digital  

## Fundamento teórico

El taller se basa en la representación digital del color mediante el modelo RGB (Red, Green, Blue), en el cual cada píxel de una imagen es codificado como una tupla de tres componentes numéricos discretos que representan la intensidad de los canales rojo, verde y azul en un rango típico de 0 a 255.

El espacio de color RGB es ampliamente utilizado en sistemas computacionales debido a su compatibilidad directa con sensores ópticos (cámaras digitales), pantallas y dispositivos de adquisición de imágenes. A diferencia de otros modelos de color perceptuales (como HSV o CIE-Lab), RGB representa de forma directa la composición física de la luz emitida o capturada, lo que lo hace especialmente adecuado para procesos de adquisición y análisis computacional de imágenes sin transformaciones intermedias.

A partir de estos valores se construye un índice simplificado inspirado en técnicas de teledetección vegetal como el NDVI (Normalized Difference Vegetation Index), permitiendo aproximar el estado fisiológico de una hoja mediante relaciones entre canales de color. Este valor simplificado se denomina Índice Cromático de Vegetación (ICV) y se calcula mediante una variante del Excess Green Index (ExG), definida como:

ICV ≈ ExG = (2G - R - B) / (R + G + B)

donde:

-   R: componente rojo del espacio RGB\
-   G: componente verde del espacio RGB\
-   B: componente azul del espacio RGB


Esta expresión constituye una aproximación empírica y pedagógica del Índice de Vegetación de Diferencia Normalizada (NDVI), el cual se define formalmente como:

NDVI = (NIR - R) / (NIR + R)

Como se observa, el NDVI incorpora la banda del infrarrojo cercano (NIR, Near-Infrared), la cual es capturada mediante sensores especializados presentes en plataformas satelitales o aerotransportadas. Esta banda es fundamental debido a que la vegetación sana refleja fuertemente la radiación en el espectro infrarrojo cercano, lo cual permite estimar con alta precisión su actividad fotosintética y contenido de biomasa.

Para fines prácticos de este taller, al no contar con imágenes multiespectrales ni sensores NIR, se elimina la dependencia del infrarrojo cercano (NIR) y se construye una aproximación empírica basada únicamente en el espacio RGB, dando lugar a un índice cromático derivado del Excess Green Index (ExG) con interpretación heurística del vigor vegetal. Esta formulación implica una reducción en la fidelidad espectral respecto a índices multiespectrales como el NDVI, por lo que el Índice Cromático de Vegetación (ICV) debe interpretarse como un descriptor cromático computacional basado en RGB y no como un equivalente físico del NDVI., sino como una simplificación didáctica orientada a la comprensión conceptual de cómo las relaciones entre canales de color pueden utilizarse para inferir patrones de salud vegetal.


## Pipeline computacional implementado

El cálculo del ICV se basa en un promedio espacial de píxeles dentro de
una región de interés.

### 1. Muestreo espacial

Se utiliza una ventana cuadrada alrededor del punto seleccionado para
obtener un conjunto de píxeles representativos.

### 2. Filtrado por luminancia

Se eliminan píxeles con valores extremos de iluminación:

L = 0.2126R + 0.7152G + 0.0722B

-   Se descartan valores muy oscuros (\<20)
-   Se descartan valores muy brillantes (\>240)

### 3. Promedio RGB

Se calcula el promedio de los canales RGB válidos:

(R, G, B) = (Σr / N, Σg / N, Σb / N)

### 4. Cálculo del índice

ICV = (2G - R - B) / (R + G + B)


## Interpretación del modelo

El índice se fundamenta en la premisa de que la vegetación sana presenta
una mayor reflectancia en el canal verde, mientras que la absorción en
los canales rojo y azul es más pronunciada debido a la actividad
fotosintética de la clorofila.

-   Valores positivos altos → vegetación vigorosa\
-   Valores cercanos a cero → estado intermedio\
-   Valores negativos → posible estrés vegetal

### Limitaciones del Índice Cromático de Vegetación

Debido a la naturaleza simplificada del Índice Cromático de Vegetación (ICV), se identifican diversas limitaciones inherentes a su diseño y supuestos. A continuación, se describen las principales:

- **Dependencia del espacio RGB y ausencia de información espectral infrarroja:**  
  El ICV utiliza exclusivamente los canales rojo y verde del espacio RGB, lo cual implica la ausencia de la banda del infrarrojo cercano (NIR), componente fundamental en índices como el NDVI. Esta limitación reduce significativamente la capacidad del índice para caracterizar procesos fisiológicos reales de la vegetación.

- **Sensibilidad a variaciones de iluminación y condiciones de captura:**  
  El valor del índice puede verse afectado por cambios en la iluminación ambiental, exposición de la cámara, balance de blancos y calidad del sensor del dispositivo utilizado. Esto introduce variabilidad no asociada al estado real de la planta, sino a condiciones externas de medición.

- **Dependencia del contexto cromático de la muestra:**  
  Dado que el índice se basa en relaciones entre los canales R y G, su interpretación puede verse sesgada en presencia de hojas con pigmentaciones naturalmente oscuras o con variaciones cromáticas no asociadas a estrés fisiológico.

- **Desviación respecto a interpretaciones biológicas del NDVI:**  
  Debido a la sustitución del canal NIR por el canal rojo, el comportamiento del ICV no es directamente comparable con el NDVI. En consecuencia, valores numéricos similares no implican equivalencia en términos de salud vegetal.

El ICV es un descriptor cromático computacional derivado de información RGB, no un indicador biológico directo. Su propósito es educativo, exploratorio y de aproximación conceptual al análisis de vegetación mediante visión computacional.


## Requisitos

### Tecnológicos
- Dispositivo móvil con cámara o computadora portátil
- Acceso a la aplicación web del proyecto
- Conexión a internet estable

### Material físico
- Hojas impresas de la bitácora de registro del Índice Cromático de Vegetación
- Lápices o plumas
- Hojas de plantas (no vivas, recolectadas previamente)
- Pizarrón o rotafolio
- Proyector (opcional, para la fase de demostración grupal)


## Uso de la herramienta

La siguiente sección describe el procedimiento para utilizar la herramienta desarrollada, disponible en el siguiente enlace:

https://detectives-del-estres-vegetal.vercel.app/

### Procedimiento

1. Acceder a la aplicación web desde un dispositivo móvil o computadora portátil.  
2. Cargar o capturar una imagen de una hoja vegetal.  
3. Seleccionar un punto representativo dentro de la imagen.  
4. Obtener los valores correspondientes al modelo RGB (Rojo, Verde, Azul).  
5. Registrar los valores obtenidos en la bitácora de análisis.  

## Resultados esperados

- Comprensión de la representación digital del color mediante el modelo RGB
- Interpretación básica de datos numéricos derivados de imágenes
- Introducción conceptual a índices de vegetación y teledetección
- Desarrollo de pensamiento analítico aplicado a sistemas naturales

## Evidencias

- Registro fotográfico del taller
- Tablas de datos RGB e índices calculados
- Lista de asistencia de participantes

## Consideraciones

-   Evitar cualquier daño a vegetación viva durante la recolección de muestras.
-   Garantizar condiciones adecuadas de iluminación para la captura de imágenes, minimizando variaciones experimentales.
-   Verificar previamente la conectividad a internet en caso de dependencia de la herramienta web.
-   La actividad es adaptable a un modo offline mediante el uso de imágenes previamente almacenadas.

## Recursos
### Presentación PENDIENTE CARGARLA

Se encuentra adjunta en el repositorio en la siguiente ruta:  
`src/documents/presentation.pdf`

### Lista de asistencia

Se encuentra adjunta en el repositorio en la siguiente ruta:  
`src/documents/assistance_list.pdf`

### Fotografías

Durante el evento se capturarán evidencias fotográficas con fines de documentación y difusión del taller.  
Estas podrán publicarse en las redes sociales del colectivo.

Adicionalmente, se dispondrá de una carpeta de respaldo accesible en el siguiente enlace:  
[https://goo.su/rTtYf6d](https://goo.su/rTtYf6d)


### Branding del evento

Se encuentra adjunto en el repositorio en la siguiente ruta:  
`src/documents/branding/`

Incluye:

-   Material para publicación de difusión en Instagram
-   Material para publicación de difusión en Facebook
-   Portada para Eventbrite
-   Ficha técnica del evento
-   Material para difusión en WhatsApp

## Versionamiento

Este proyecto utiliza control de versiones basado en Git, con el objetivo de asegurar trazabilidad, reproducibilidad y evolución incremental del sistema y la metodología del taller.

El esquema de versionamiento sigue el estándar:

**MAJOR.MINOR.PATCH**

-   **MAJOR**: cambios estructurales en la metodología del taller o en la arquitectura del sistema.
-   **MINOR**: incorporación de nuevas funcionalidades o mejoras en el flujo del taller.
-   **PATCH**: corrección de errores o ajustes menores sin impacto metodológico.

### Ejemplo de versiones:

-   `v1.0.0` → versión inicial del taller y la herramienta
-   `v1.1.0` → mejora del cálculo del índice cromático
-   `v1.1.1` → corrección de errores en interfaz

## Contribuciones

Este proyecto está abierto a contribuciones por parte del colectivo Singularity, así como de colaboradores externos interesados en ciencia ciudadana, percepción remota y educación tecnológica.

### 1. Clonar el repositorio

```bash
git clone https://github.com/singularity/detectives-estres-vegetal.git
cd detectives-estres-vegetal
```
### 2. Crear una nueva rama
Se recomienda realizar el desarrollo en una rama independiente:
```bash
git checkout -b feature/nombre-de-la-mejora
```
Ejemplos:
-   `feature/mejora-ui-movil`
-   `feature/nuevo-indice-vegetal`
-   `fix/error-calculo-rgb`

### 3. Realizar cambios
-   Mantener coherencia con la metodología del taller.
-   Evitar modificaciones estructurales sin justificación técnica.
-   Documentar adecuadamente los cambios relevantes en el código y en la documentación del proyecto.

### 4. Commit con formato estructurado
Se utiliza el siguiente estándar de commits:
```bash
tipo: descripción breve

[detalle opcional]
```

Tipos válidos:

-   `feat` → nueva funcionalidad
-   `fix` → corrección de errores
-   `docs` → cambios en documentación
-   `refactor` → reestructuración del código sin cambio funcional
-   `test` → pruebas

Ejemplo:
```bash
feat: implementación de índice cromático alternativo

Se incorpora una variante de la fórmula basada en (G - R) / (G + R + 1) para mejorar estabilidad numérica.
```
### 5. Push de la rama
```bash
git push origin feature/nombre-de-la-mejora
```
### 6. Abrir un pull request
Al abrir un PR en GitHub, utilizar la siguiente plantilla:
```bash
## Descripción

Describe brevemente el cambio realizado.

## Tipo de cambio

- [ ] Nueva funcionalidad
- [ ] Corrección de error
- [ ] Mejora de documentación
- [ ] Refactorización

## Justificación técnica

Explica por qué este cambio es necesario desde una perspectiva técnica o metodológica.

## Impacto en el taller

- [ ] No afecta la dinámica del taller
- [ ] Modifica ligeramente la experiencia del usuario
- [ ] Requiere actualización del protocolo del taller

## Evidencia (si aplica)

Capturas de pantalla, pruebas o resultados experimentales.
```

### 7. Revisión y merge.
Todos los Pull Requests serán revisados por el equipo de Singularity antes de su integración en la rama principal (`main` o `dev`), garantizando consistencia metodológica y técnica del proyecto.

## Créditos


La elaboración de este evento fue realizada en su totalidad por el colectivo **Singularity**, dentro del área de Ciencia y Tecnología Aplicada.

Herramienta desarrollada por: **[@ReplacedSpace17](https://github.com/replacedspace17)**

Para colaboraciones, puedes contactarnos mediante el correo:  
replacedspace17@singularitymx.org

### Redes del colectivo

-   Página web: [https://singularitymx.org](https://singularitymx.org)
-   Instagram: [https://instagram.com/singularity.open](https://instagram.com/singularity.open)
-   Facebook: [https://facebook.com/singularity.py](https://facebook.com/singularity.py)

## Sobre Singularity
**Singularity** es un colectivo de ciencia abierta y tecnología fundado en 2023 en la ciudad de León, Guanajuato. Su objetivo es el desarrollo de proyectos interdisciplinarios en la intersección entre computación, biología, ingeniería y educación experimental.

Las áreas de trabajo del colectivo incluyen, entre otras:

-   Ciencia ciudadana y divulgación científica
-   Desarrollo de herramientas tecnológicas educativas
-   Biología DIY (Do It Yourself Biology)
-   Sistemas bio-digitales y experimentación con datos biológicos

El colectivo pertenece a iniciativas globales como **DIY Biology**, a través de comunidades abiertas como [DIYbio](https://diybio.org/), así como el concepto de **DIY Biosphere**, enfocado en la experimentación biológica distribuida y de bajo costo.

Si estás interesado en formar parte del colectivo, puedes registrarte en el siguiente enlace:  
[https://tally.so/r/VLV7eM](https://tally.so/r/VLV7eM)

