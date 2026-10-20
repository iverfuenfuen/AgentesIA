// Clave de localStorage definida en AGENTS.md
const STORAGE_KEY = "diario-sesiones";

const form = document.getElementById("session-form");
const dateInput = document.getElementById("date");
const topicInput = document.getElementById("topic");
const minutesInput = document.getElementById("minutes");
const errorEl = document.getElementById("error");
const listEl = document.getElementById("session-list");
const emptyEl = document.getElementById("empty");
const streakEl = document.getElementById("streak-value");

// ---------- Fechas (siempre en hora LOCAL) ----------

// Rellena con cero a la izquierda: 5 -> "05"
function pad(n) {
  return String(n).padStart(2, "0");
}

// Date -> "AAAA-MM-DD" usando la fecha local
function formatDate(date) {
  return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
}

// "AAAA-MM-DD" -> Date local (sin new Date("AAAA-MM-DD"), que usa UTC)
function parseDate(text) {
  const [y, m, d] = text.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// Fecha de hoy como texto AAAA-MM-DD
function todayString() {
  return formatDate(new Date());
}

// Suma (o resta) días a una fecha AAAA-MM-DD
function addDays(text, days) {
  const date = parseDate(text);
  date.setDate(date.getDate() + days);
  return formatDate(date);
}

// "2026-10-20" -> "20/10/2026" (solo para mostrar)
function displayDate(text) {
  const [y, m, d] = text.split("-");
  return d + "/" + m + "/" + y;
}

// ---------- Datos ----------

function loadSessions() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}

function saveSessions(sessions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

// ---------- Racha ----------

// Días consecutivos con sesión que terminan hoy o ayer
function calculateStreak(sessions) {
  const days = new Set(sessions.map((s) => s.date));
  const today = todayString();
  const yesterday = addDays(today, -1);

  let cursor;
  if (days.has(today)) cursor = today;
  else if (days.has(yesterday)) cursor = yesterday;
  else return 0;

  let streak = 0;
  while (days.has(cursor)) {
    streak++;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

// ---------- Pantalla ----------

function render() {
  const sessions = loadSessions();

  // Más reciente primero; si la fecha es igual, la última guardada arriba
  const sorted = sessions.slice().sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return b.id - a.id;
  });

  listEl.innerHTML = "";
  sorted.forEach((s) => {
    const li = document.createElement("li");

    const info = document.createElement("div");
    const topic = document.createElement("div");
    topic.className = "session-topic";
    topic.textContent = s.topic;
    const date = document.createElement("div");
    date.className = "session-date";
    date.textContent = displayDate(s.date);
    info.append(topic, date);

    const minutes = document.createElement("div");
    minutes.className = "session-minutes";
    minutes.textContent = s.minutes + " min";

    li.append(info, minutes);
    listEl.appendChild(li);
  });

  emptyEl.hidden = sorted.length > 0;

  const streak = calculateStreak(sessions);
  streakEl.textContent = streak + (streak === 1 ? " día" : " días");
}

// ---------- Formulario ----------

function showError(message) {
  errorEl.textContent = message;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const date = dateInput.value;
  const topic = topicInput.value.trim();
  const minutes = Number(minutesInput.value);

  if (!date) return showError("Elige una fecha.");
  if (date > todayString()) return showError("La fecha no puede ser futura.");
  if (!topic) return showError("Escribe el tema.");
  if (!Number.isInteger(minutes) || minutes <= 0) {
    return showError("Los minutos deben ser un número entero mayor que 0.");
  }

  const sessions = loadSessions();
  sessions.push({ id: Date.now(), date: date, topic: topic, minutes: minutes });
  saveSessions(sessions);

  showError("");
  topicInput.value = "";
  minutesInput.value = "";
  render();
});

// ---------- Inicio ----------

dateInput.value = todayString();
dateInput.max = todayString();
render();
