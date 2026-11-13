# Alcance de la selección de código

Los ZIP originales se trataron como material de referencia. No se ejecutó su PHP ni se conectó el portafolio a sus bases de datos o APIs. Los originales no se alteraron.

## Contenido incluido en el visor

| Proyecto | Archivo de origen | Líneas | Propósito |
| --- | --- | --- | --- |
| Techorin | assets/js/tienda.js | 85–123 | Comparación aproximada de palabras y puntuación de resultados |
| Techorin | php/promociones_helper.php | 10–46 | Normalización y texto de promociones |
| Civora | public_html/assets/js/cv-score.js | 83–145 | Evaluación del contenido de un CV |
| Civora | public_html/assets/js/cv-score.js | 156–211 | Coincidencias entre un CV y una oferta |
| Kathia | public_html/promotions.js | 7–18 | Validación de promociones combinadas |
| Kathia | public_html/experience.js | 2–24 | Controles de un carrusel accesible |

Son extractos para lectura, con dependencias de contexto omitidas; no son módulos completos listos para ejecutar. Se revisaron y se seleccionaron partes sin valores privados. No fue necesario mostrar secretos censurados: se excluyeron los archivos y bloques que podrían contenerlos.

## Exclusiones

No se entregan ZIP originales, `.env`, configuraciones, conexiones a bases de datos, claves, tokens, archivos SQL, registros, sesiones, datos de clientes, pedidos, comprobantes, respaldos, paneles administrativos ni su lógica de autenticación.

Los datos de contacto publicados en el portafolio son únicamente el correo y WhatsApp que su titular proporcionó expresamente para mostrarlos. Las capturas corresponden a las portadas públicas de los tres sitios.

## Controles de la entrega

- Lista cerrada de archivos permitidos en la carpeta distribuida.
- Selección de seis extractos con revisión de su texto.
- Comparación local, sin imprimir valores, contra posibles credenciales encontradas en archivos de configuración de los ZIP.
- El visor escapa el contenido de los extractos y solo lo presenta como texto; no lo evalúa ni contacta las APIs de origen.

Esta revisión está limitada al paquete del portafolio. No constituye una auditoría de seguridad de los tres sitios completos ni una limpieza de los ZIP originales. No publiques los originales como sustituto de este paquete.
