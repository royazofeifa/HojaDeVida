# Portafolio de Roy Alexander Azofeifa Muñoz

Sitio estático bilingüe para GitHub Pages. HTML semántico, CSS y JavaScript sin frameworks ni servicios de compilación en producción.

## Revisar y publicar

1. Revisar el Pull Request, sus archivos y los PDF.
2. Confirmar los datos pendientes que se detallan a continuación.
3. Aprobar y fusionar el PR a `main` cuando el contenido esté listo.
4. Comprobar el despliegue de GitHub Pages en Actions y abrir el sitio publicado en ES y EN.

La rama de trabajo no cambia el sitio publicado. La configuración existente de GitHub Pages se conserva.

## Vista local

Desde la carpeta del repositorio:

```sh
python -m http.server 8765
```

Abrir `http://localhost:8765/?lang=es` o `http://localhost:8765/?lang=en`. La selección de idioma y tema se guarda si el navegador permite almacenamiento local. El idioma de la URL tiene prioridad.

## Archivos

- `index.html`: contenido web en español, claves bilingües, metadatos y dos vistas de impresión.
- `assets/styles.css`: identidad visual original y mejoras de legibilidad, contraste, navegación móvil e impresión.
- `assets/app.js`: selección explícita de idioma, tema, impresión y copia de registros con avisos accesibles.
- `assets/translations.json`: textos ES/EN y copia embebida en el HTML para funcionar sin peticiones de traducción.
- `assets/profile.json`: contenido de los tres PDF y referencia para mantener las vistas impresas consistentes.
- `assets/roy.webp`: fotografía optimizada; `roy.jpeg` se conserva sin modificación.
- `scripts/build_resumes.py`: generación reproducible de los PDF; requiere ReportLab. Usa Arial en Windows y Bitstream Vera como alternativa incluida en ReportLab.
- `scripts/check_portfolio.py`: enlaces locales, claves bilingües, estructura y extracción de texto de los PDF. Requiere lxml y PyMuPDF. `--links` comprueba destinos públicos con validación TLS.
- `Roy_Azofeifa_Resume_EN.pdf`: resume general en inglés.
- `Roy_Azofeifa_CV_ES.pdf`: CV general en español.
- `Roy_Azofeifa_Amazon_Support_Engineer_CV.pdf`: resume enfocado en soporte TI; conserva la ruta histórica para no romper enlaces. El botón identifica su contenido actual.

## Mantenimiento

Actualizar ambos idiomas al cambiar hechos profesionales. Mantener alineados `profile.json`, `translations.json`, la copia embebida y las vistas de impresión del HTML. Regenerar los PDF con `python scripts/build_resumes.py`; ejecutar `python scripts/check_portfolio.py`; revisar el resultado visual antes de publicar. No adjuntar diplomas o constancias con identificadores personales al repositorio público.

## Diagnóstico y decisiones

La versión original tenía una identidad reconocible —azul oscuro, turquesa, tarjetas y fotografía—, navegación sencilla, dos temas y un inicio de experiencia bilingüe. Sus principales debilidades eran el énfasis académico ampliado respecto al diploma, la formación del PDF fuera del orden deseado, impresión demasiado pequeña, traducción por reemplazo de nodos de texto y navegación móvil oculta. Había animación continua y contenido oculto hasta ejecutar JavaScript.

Se conserva esa identidad y la fotografía auténtica. Se reduce el movimiento continuo, se refina la jerarquía, se declara soporte e infraestructura como eje profesional y se utiliza Amazon ERC como experiencia en atención regional de casos, sin transformarla en un puesto técnico en Amazon. Se conserva el historial de cargos y fechas del repositorio. Los empleos finalizados en noviembre de 2025 se ordenan por fecha de inicio descendente cuando comparten fecha final.

La maestría aparece una sola vez en la formación web y antes del bachillerato, con su nombre oficial completo y enlace a UISIL. En inglés se mantiene el nombre oficial español y se añade una traducción descriptiva; no se declara equivalencia académica estadounidense o canadiense. La Licenciatura en Ingeniería de Sistemas figura expresamente en curso, con tres materias pendientes, según aclaración del titular.

El diploma confirma el nombre **MAESTRÍA PROFESIONAL EN CIENCIAS DE LA EDUCACIÓN CON ÉNFASIS EN DOCENCIA**, otorgado el 7 de agosto de 2026. La constancia MEP VT6 corresponde a clasificación para docencia y no se utiliza para atribuir certificaciones técnicas, experiencia en IA o una especialización académica adicional. Los documentos fuente no se publican.

Los resumes usan texto seleccionable, una columna, encabezados convencionales, dos páginas, sin fotografía ni identificadores, edad o estado civil. No se promete compatibilidad universal con ATS. No se agregan métricas de logros, cargos o proyectos no documentados.

## Validación de la implementación

- Sintaxis de JavaScript comprobada con `node --check assets/app.js`.
- Verificación estructural con `scripts/check_portfolio.py`: IDs únicos, destinos de anclas, archivos locales, claves ES/EN completas, enlaces externos con `noopener noreferrer`, una maestría en la formación web y tres PDF con texto extraíble sin imágenes.
- Revisión en navegador de ambos idiomas y temas; navegación móvil disponible y sin desbordamiento en 320, 390, 768 y 1280 píxeles.
- Salto al contenido activado mediante teclado; foco llevado a `main`. Estilos de foco visibles y objetivos de botones de al menos 44 píxeles.
- Botón de copia de credenciales comprobado con anuncio de éxito; alternativa de selección manual si el portapapeles no está disponible.
- Impresión A4 en español y Carta en inglés comprobada con dos páginas, sin fotografía; los tres PDF descargables se renderizaron y revisaron visualmente.
- Imagen principal reducida de 1024 × 1536 JPEG a 480 × 720 WebP, con dimensiones explícitas, sin modificar rasgos del rostro.
- Los enlaces a UISIL e Inter-Tech responden HTTP 200. LinkedIn responde HTTP 999 a la verificación automatizada. La consulta automatizada al portal INA falla por la cadena de certificados; se conserva la URL oficial y no se omite la validación TLS.

Estas son verificaciones prácticas de los aspectos aplicables; no constituyen una auditoría exhaustiva de WCAG ni validación por todos los ATS o dispositivos.

## Datos pendientes de corroborar

- Confirmar si Inter-Tech continúa como actividad profesional vigente: se mantiene noviembre de 2025, como en el repositorio, hasta aclarar esa fecha.
- Confirmar vigencia del puesto docente y posibles cargos adicionales de educación superior; no se inventan empleadores ni fechas.
- Corroborar individualmente las credenciales INA, C1 oral, horas y registros en el portal emisor; se conservan los datos ya publicados. CCNA se presenta como formación, no como certificación profesional Cisco.
- El año 2023 del bachillerato y las fechas de empleo provienen del repositorio; la constancia MEP respalda el grado, no todas esas fechas.
- Aportar, si se desea, logros medibles y casos de proyectos con alcance autorizado para publicación. No se han fabricado porcentajes ni resultados.
- Comprobar manualmente el perfil LinkedIn y el portal INA desde un navegador con acceso al servicio.

## Fuentes de criterios de presentación

Consultadas el 22 de octubre de 2026:

- [Job Bank del Gobierno de Canadá — How to write a good resume](https://www.jobbank.gc.ca/findajob/resources/write-good-resume?wbdisable=true): claridad, relevancia, veracidad y exclusión de datos personales innecesarios y fotografía en el resume.
- [CareerOneStop, patrocinado por el Departamento de Trabajo de EE. UU. — Resume formatting](https://cloudfront.careeronestop.org/JobSearch/Resumes/ResumeGuide/formatting.aspx): formato sencillo, una columna, títulos convencionales, texto legible y precauciones de lectura ATS.
- [UISIL](https://uisil.ac.cr/): destino institucional de la formación académica.
