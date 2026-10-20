# Taller guiado · Diario de Estudio

## Estación 1 · El prompt inicial

# Rol
Eres un desarrollador frontend senior que escribe código simple y bien comentado para alguien que está empezando a programar.

# Contexto
Quiero una web llamada "Diario de Estudio" para registrar mis sesiones de estudio y mantener una racha diaria. Es la primera versión y la uso solo yo, en el navegador.

# Tarea
- Un formulario para registrar una sesión: fecha, tema y minutos.
- Una lista de sesiones ordenada de la más reciente a la más antigua.
- Un indicador con la racha actual (días seguidos estudiando).
- Los datos se guardan en el navegador y siguen ahí al recargar.

# Reglas de la racha
- La fecha se maneja siempre en la fecha LOCAL del usuario, en formato AAAA-MM-DD. No uses toISOString() ni new Date("AAAA-MM-DD"), porque trabajan en UTC y pueden mover el día.
- Un día cuenta si tiene al menos una sesión. Varias sesiones el mismo día cuentan como un solo día.
- La racha es el número de días consecutivos con sesión que terminan hoy o ayer. Si hoy todavía no he estudiado, la racha no se rompe hasta que termine el día.
- Si no hay sesión ni hoy ni ayer, la racha es 0.
- No se permiten fechas futuras ni minutos menores o iguales a 0.

# Restricciones
- HTML, CSS y JavaScript sin frameworks ni librerías externas.
- Datos en localStorage.
- Textos de la interfaz en español.
- Debe verse bien en el móvil.
- Un cambio a la vez: no añadas funciones que no pedí.

# Formato de salida
Crea los archivos index.html, styles.css y app.js. Al terminar, responde con un resumen de máximo 3 líneas y una lista de las decisiones que tomaste por tu cuenta.






## Estación 2 · El AGENTS.md
```markdown
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

## Estación 3 · La petición de plan
Estamos en modo Plan: NO escribas código todavía.

Quiero añadir al Diario de Estudio un resumen con los minutos estudiados por semana de las últimas cuatro semanas.

Antes de escribir código, dame un plan que incluya:

1. Cálculo: cómo determinas a qué semana pertenece cada sesión (la semana empieza el lunes, con fecha local según AGENTS.md) y cómo sumas los minutos.
2. Archivos: qué archivos vas a tocar o crear, y qué cambia en cada uno.
3. Casos límite: semanas sin sesiones, sesiones en domingo o lunes, cambio de mes o de año, sesiones fuera de las últimas cuatro semanas, y sin datos.
4. Dudas: todo lo que no esté claro y necesites preguntarme (por ejemplo, cómo se muestra el resultado).
5. Verificación: cómo vamos a comprobar que las sumas son correctas.

Respeta AGENTS.md: sin librerías nuevas y sin tocar el formato de los datos guardados. Espera mi aprobación antes de implementar.
```

---

## Estación 4 · La revisión

**1. La semana está mal calculada (y no se calcula realmente).** `toISOString()` devuelve la hora en UTC, no la local. En Colombia (UTC-5), una sesión registrada a las 8 p. m. ya cae en el día siguiente. Además, eso devuelve una fecha completa, no una semana, así que el plan no define qué es "una semana" ni cuál es su primer día. Debe definirse (lunes) y calcularse con fecha local.

**2. Se omiten las semanas sin sesiones.** Si solo sumas las semanas que aparecen en los datos, una semana en la que no estudiaste desaparece, en lugar de mostrarse con 0 minutos. El resumen pide las últimas cuatro semanas, y siempre deben salir las cuatro.

**3. Instala Chart.js sin que nadie lo pidiera.** Rompe la restricción de "sin librerías", añade una dependencia a un proyecto sin build y es demasiado para un resumen de cuatro números. Una lista simple o barras hechas con CSS bastan.

**4. El orden es el de los datos.** Las sesiones pueden estar en cualquier orden, así que el resumen saldría desordenado. Las semanas deben mostrarse en orden cronológico (o de la más reciente a la más antigua, pero de forma consistente) y limitarse a las últimas cuatro.

**Falta además:** el plan no lista archivos, no menciona casos límite, no hace preguntas y no dice cómo se verificará.
