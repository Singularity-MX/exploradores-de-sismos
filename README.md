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
11. [Consideraciones](#consideraciones)
12. [Versionamiento](#versionamiento)
13. [Contribuciones](#contribuciones)
14. [Créditos](#créditos)
15. [Sobre Singularity](#sobre-singularity)

## Descripción

Exploradores de Sismos es una experiencia formativa interactiva desarrollada por el colectivo Singularity, orientada a la medición de vibraciones mecánicas y sismos utilizando los sensores inerciales internos (acelerómetros) de los dispositivos móviles.

A partir de estos datos, se construyen gráficas de aceleración en tiempo real inspiradas en las estaciones sismológicas y redes de ciencia ciudadana, con el propósito de comprender cómo la tecnología de consumo puede convertirse en una herramienta de monitoreo geofísico y alerta temprana.

## Objetivo

Que los participantes comprendan el principio físico básico de un sismógrafo y cómo un sistema computacional transforma fuerzas mecánicas en datos numéricos (ejes X, Y, Z). Además, busca explorar de forma práctica cómo la ciencia ciudadana puede ayudar en la detección y triangulación de eventos sísmicos urbanos.

## Ficha técnica

- Nombre: Exploradores de Sismos  
- Duración: 1.5 horas (90 minutos)  
- Fecha: 30 de mayo del 2026
- Lugar: IMJU Parque Hidalgo  
- Participantes: 45 personas  
- Modalidad: Taller práctico con experimentación física y apoyo digital  

## Fundamento teórico
El taller se basa en la tecnología MEMS (Micro-Electro-Mechanical Systems) presente en prácticamente todos los teléfonos inteligentes actuales. Estos chips actúan como sismómetros en miniatura, midiendo los cambios de velocidad por unidad de tiempo a lo largo de tres ejes espaciales ortogonales:

- **Eje X:** Movimiento lateral (Izquierda - Derecha)
- **Eje Y:** Movimiento longitudinal (Adelante - Atrás)
- **Eje Z:** Movimiento vertical (Arriba - Abajo)

En sismología, el interés principal en el monitoreo cercano a las zonas urbanas radica en la Aceleración Máxima del Suelo (PGA, por sus siglas en inglés). Para determinar la magnitud absoluta de la fuerza que experimenta el dispositivo, independientemente de su orientación espacial, se calcula la norma euclidiana (el vector resultante) de los tres ejes:

$$a_{total} = \sqrt{a_x^2 + a_y^2 + a_z^2}$$

Esta expresión permite consolidar las fuerzas tridimensionales en un único valor de magnitud. Cuando el dispositivo se encuentra en reposo absoluto sobre una superficie plana, el valor de magnitud se estabiliza alrededor de $9.81 m/s^2$, correspondiente a la aceleración de la gravedad terrestre que empuja el eje Z hacia abajo. Cualquier pico anómalo por encima de este umbral indica una perturbación mecánica, ya sea un golpe local o la propagación de una onda sísmica (Ondas P y S).

## Pipeline computacional implementado

El cálculo y visualización del movimiento se basa en un flujo de procesamiento en tiempo real dentro del navegador web.

## Pipeline computacional implementado


### 1. Adquisición de datos espaciales
Se utiliza la API `DeviceMotionEvent` de JavaScript para capturar la aceleración (incluyendo gravedad) a altas frecuencias de muestreo (milisegundos).

### 2. Cálculo vectorial
Se aplica la ecuación de magnitud espacial a cada muestra entrante para determinar la fuerza total absoluta del movimiento actual:
$$m = \sqrt{x^2 + y^2 + z^2}$$

### 3. Buffering y renderizado
Los datos se almacenan en arreglos temporales (`liveData` y `recordedData`) y se inyectan en un elemento `<canvas>` empleando transformaciones geométricas, lo que permite visualizar las ondas de forma interactiva y performante.

### 4. Análisis retrospectivo
Se implementa un cursor interactivo acoplado a un `Slider` que permite navegar por la grabación de los datos milisegundo a milisegundo para inspeccionar los picos máximos (PGA) exactos tras un evento.

## Limitaciones del Sismómetro Móvil

Aunque el sistema es excelente para fines didácticos, difiere de un equipo sismológico oficial en los siguientes aspectos:
- **Anclaje:** Un sismógrafo real está firmemente anclado a la roca madre de la Tierra. El celular está suelto sobre una mesa o en manos de un usuario, por lo que introduce "ruido" mecánico de su entorno inmediato.
- **Calibración:** Los acelerómetros MEMS comerciales varían en sensibilidad según el fabricante y no están calibrados bajo estándares geofísicos estrictos.
- **Filtro de ruido:** Las aplicaciones científicas (como *MyShake*) implementan redes neuronales avanzadas en el dispositivo para distinguir un temblor real de un usuario corriendo o tirando su teléfono.

## Requisitos

### Tecnológicos
- Dispositivo móvil (smartphone) con acelerómetro funcional.
- Navegador web moderno (Chrome, Safari, Firefox).
- Permisos explícitos habilitados para lectura de sensores de movimiento (API Orientation/Motion).
- Conexión a internet estable para cargar la Single Page Application (SPA).

## Uso de la herramienta

La siguiente sección describe el procedimiento para utilizar la herramienta desarrollada.

### Procedimiento

1. Acceder a la aplicación web mediante el código QR proporcionado en el taller o con el siguiente enlace https://exploradores-de-sismos.vercel.app/
2. Otorgar permisos de acceso a los sensores inerciales cuando el navegador lo solicite.  
3. Colocar el dispositivo completamente plano sobre una superficie rígida (mesa) o suelo.
4. Utilizar el botón **Iniciar Grabación** instantes antes de iniciar la simulación mecánica (golpes o saltos coordinados).
5. Seleccionar **Detener y Analizar** para comprimir la onda capturada y utilizar el control deslizante inferior para inspeccionar el pico máximo de aceleración.
6. Registrar la magnitud del evento (en $m/s^2$) en la bitácora de análisis.

## Resultados esperados

- Comprensión de la representación digital de fuerzas físicas y ondas.
- Interpretación básica de datos vectoriales en tres dimensiones.
- Introducción al concepto de Ciencia Ciudadana y redes de monitoreo masivo.
- Desarrollo de habilidades de experimentación física sistemática.

## Consideraciones

- **Seguridad de los equipos:** Garantizar que los dispositivos móviles estén ubicados en zonas seguras, lejos del borde de las mesas para evitar caídas durante los impactos simulados.
- En el "sismo coordinado" (salto grupal), los participantes deben asegurar sus teléfonos firmemente en sus bolsillos o manos.
- La herramienta está diseñada como una prueba de concepto educativa y no sustituye los sistemas de alerta temprana de protección civil.

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
-   `feature/nueva-carcateristica`

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

