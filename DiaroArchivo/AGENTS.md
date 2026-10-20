# AGENTS.md — Diario de Estudio

## Proyecto
- Web personal para registrar sesiones de estudio (fecha, tema, minutos) y ver la racha diaria.
- Proyecto de práctica del curso SENA ADSO. Lo usa una sola persona.

## Stack y estructura
- HTML, CSS y JavaScript vanilla. Sin frameworks, sin librerías, sin build.
- index.html (estructura), styles.css (estilos), app.js (lógica).

## Convenciones
- Textos de la interfaz en español; nombres de variables y funciones en inglés.
- Funciones cortas, con una sola tarea y un comentario de una línea.
- Mobile first: probar primero en pantalla estrecha.

## Datos
- Se guardan en localStorage bajo la clave "diario-sesiones".
- Cada sesión: { id, date, topic, minutes }.
- date es texto AAAA-MM-DD; minutes es un entero mayor que 0.

## Fechas y racha
- Usar siempre la fecha LOCAL. Prohibido toISOString() y new Date("AAAA-MM-DD").
- Construir fechas con getFullYear(), getMonth() y getDate().
- La semana empieza el lunes.
- Racha = días consecutivos con al menos una sesión que terminan hoy o ayer.
- Varias sesiones el mismo día cuentan como un día.

## Límites
- No añadir dependencias ni archivos nuevos sin preguntar.
- No tocar el formato de datos guardado sin avisar: se perderían las sesiones.
- No guardar claves, tokens ni credenciales en el código.
- Un cambio a la vez; no refactorizar lo que no se pidió.

## Verificación
- Antes de dar algo por terminado, probar: sin datos, una sesión hoy, sesión ayer, hueco de un día y sesión a las 11 p. m.
- Recargar la página y comprobar que los datos siguen ahí.
- Explicar qué se probó y qué no.
