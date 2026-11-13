# Código con carácter — portafolio interactivo

Portafolio orientado a oportunidades laborales, con tres proyectos publicados:

| Proyecto | Tipo | Sitio |
| --- | --- | --- |
| Ofertas Techorin | Tienda online con catálogo amplio | https://ofertastechorin.com/ |
| Civora Vitae | Generador de currículums con plantillas ATS | https://civoravitae.com/ |
| Kathia Studio Beauty | Tienda de cuidado capilar | https://kathiastudiobeuty.cl/ |

## Tecnologías

Experiencia presentada: **PHP, JavaScript, CSS y MySQL**.

Este portafolio está construido con HTML, CSS, JavaScript y WebGL nativo, sin dependencias de compilación. Los proyectos PHP se visitan en sus dominios originales.

## Interacciones

- K tridimensional extruida y biselada, con giro en todos los ejes, inercia y materiales cromo, cobalto y coral. Arrastra o usa las flechas; pulsa R para restablecerla.
- Byte, un oso vectorial con ojos y cabeza que siguen el cursor. Al tocarlo saluda.
- Cursor con seguimiento suave, estados contextuales y partículas sobre los proyectos.
- Encabezado con texto animado, cinta de tecnologías y transiciones de entrada.
- Switch Vista / Código en cada proyecto, con dos extractos reales revisados, resaltado de sintaxis, líneas originales y copia del fragmento.
- Capturas con recorrido animado, pausa, inclinación y ampliación. Son vistas del sitio, no aplicaciones PHP ejecutadas dentro del portafolio. El enlace «Probar el sitio real» abre cada aplicación original.
- Controles por teclado, opción de pausar movimiento y respeto de `prefers-reduced-motion`.

## Código mostrado y privacidad

Se incluyen seis extractos seleccionados de cinco archivos de los ZIP entregados. Los archivos de configuración, credenciales, bases de datos, registros, pedidos, datos personales, sesiones y áreas administrativas quedan fuera del paquete. El código se muestra como texto; no se ejecuta.

Los ZIP originales no fueron modificados ni se incluyen en esta entrega. Esta selección revisada no equivale a sanear íntegramente los archivos originales. Ver `SECURITY-NOTES.md`.

## Contacto

- Correo: [therealsogood@gmail.com](mailto:therealsogood@gmail.com)
- WhatsApp: [+56 9 5314 6756](https://wa.me/56953146756)

## Publicar en GitHub Pages

1. Crea un repositorio llamado `portafolio` en tu cuenta de GitHub.
2. Sube el contenido de esta carpeta, incluido `assets`, a la raíz de la rama `main`. `index.html` debe quedar en la raíz, sin una carpeta contenedora adicional.
3. Abre **Settings → Pages**.
4. En **Build and deployment → Source**, selecciona **Deploy from a branch**.
5. Selecciona **main** y **/(root)** y guarda.
6. Espera a que GitHub termine la publicación. Pages mostrará la URL real del sitio.

El archivo `.nojekyll` permite servir directamente estos archivos estáticos.

Guía oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Personalizar

- `index.html`: textos, nombre visible, proyectos y enlaces de contacto.
- `styles.css`: colores, tipografía y diseño adaptable.
- `script.js`: oso, cursor, visores, filtros, pausa y acciones de contacto.
- `sculpture.js`: geometría de la K, sombreado WebGL, materiales y controles.
- `code-data.js`: únicamente los seis extractos revisados que se muestran en el visor.
- `assets/`: capturas reales de los sitios y favicon.

La K es el motivo visual solicitado y «Código con carácter» es la dirección editorial. No se atribuyó un nombre personal. No se añadieron enlaces a repositorios ni LinkedIn porque aún no se proporcionaron.

## Vista local

Puedes abrir `index.html` en el navegador. La opción de copiar el correo requiere un contexto seguro o localhost; si el navegador no la permite, se muestra una indicación para copiarlo manualmente.

Las fuentes se solicitan a Google Fonts. Si no están disponibles, se usan fuentes del sistema. Las imágenes se incluyen en el repositorio.

## Verificación

Sintaxis de los tres archivos JavaScript comprobada. Se verifican las rutas locales, la triangulación de la K y el contenido permitido del paquete. La revisión visual posterior confirmó la eliminación de los textos señalados, el pie profesional, el renderizado de la K y la ausencia de desbordamiento horizontal en la vista comprobada. No se ha completado una prueba exhaustiva de todas las interacciones.

