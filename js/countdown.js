function formatDiff(ms) {
  if (ms <= 0) return "Het is zover! 🎉";

  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;

  return `${d}d ${String(h).padStart(2,"0")}u ${String(m).padStart(2,"0")}m ${String(sec).padStart(2,"0")}s`;
}

function prettyLine(ms) {
  if (ms <= 0) return "Vandaag 💖";
  const d = Math.floor(ms / 86400000);
  if (d === 0) return "Vandaag 🎉";
  if (d === 1) return "Nog 2 dagen 😍";
  return `Nog ${d} dagen ✨`;
}

/*
  Balkvulling:
  - We doen een vaste schaal op "dagen over"
  - Altijd minimaal 12% gevuld zodat hij nooit leeg lijkt
  - Dichterbij = voller
*/
function barFill(ms) {
  if (ms <= 0) return 100;

  const days = ms / 86400000;

  // schaal: 0 dagen = 100%, 160 dagen of meer = 12%
  const maxDays = 160;
  const pct = 100 - (Math.min(days, maxDays) / maxDays) * 88;

  return Math.max(12, Math.min(100, pct));
}

/* Data (00:00) */
const raw = [
  { date: new Date(2026, 1, 6, 0, 0, 0), id: 1 },  // 9 maanden
  { date: new Date(2026, 1, 14, 0, 0, 0), id: 2 }, // Valentijn
  { date: new Date(2026, 2, 3, 0, 0, 0), id: 3 },  // Chocolate Prince
  { date: new Date(2026, 2, 6, 0, 0, 0), id: 4 },  // Vakantie
  { date: new Date(2026, 3, 20, 0, 0, 0), id: 5 }, // Chocolate Queen
  { date: new Date(2026, 5, 6, 0, 0, 0), id: 6 }   // 1 jaar
];

// Sorteer op datum (voor de zekerheid)
raw.sort((a, b) => a.date.getTime() - b.date.getTime());

function tick() {
  const now = Date.now();

  raw.forEach((item) => {
    const end = item.date.getTime();
    const ms = end - now;

    const t = document.getElementById(`t${item.id}`);
    const m = document.getElementById(`m${item.id}`);
    const p = document.getElementById(`p${item.id}`);

    if (!t || !m || !p) return;

    t.textContent = formatDiff(ms);
    m.textContent = prettyLine(ms);
    p.style.width = `${barFill(ms)}%`;
  });
}

tick();
setInterval(tick, 1000);
