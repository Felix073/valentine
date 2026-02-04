const btn = document.getElementById("startBtn");
let hoverInterval = null;
let clicked = false;

function spawnHeart(x = null, y = null) {
  const heart = document.createElement("div");
  heart.className = "heart";

  const px = x ?? Math.random() * window.innerWidth;
  const py = y ?? (window.innerHeight + 20);

  heart.style.left = `${px}px`;
  heart.style.top = `${py}px`;

  const s = 0.8 + Math.random() * 1.3;
  heart.style.transform = `rotate(45deg) scale(${s})`;

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 2800);
}

btn.addEventListener("mouseenter", () => {
  if (hoverInterval) return;
  hoverInterval = setInterval(() => {
    for (let i = 0; i < 6; i++) spawnHeart();
  }, 180);
});

btn.addEventListener("mouseleave", () => {
  if (!hoverInterval) return;
  clearInterval(hoverInterval);
  hoverInterval = null;
});

btn.addEventListener("click", (e) => {
  if (clicked) return;
  clicked = true;

  const rect = btn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  for (let i = 0; i < 40; i++) {
    const ox = (Math.random() - 0.5) * 420;
    const oy = (Math.random() - 0.5) * 220;
    spawnHeart(cx + ox, cy + oy);
  }

  setTimeout(() => {
    window.location.href = "collage.html";
  }, 3000);
});

document.addEventListener("click", (e) => {
  if (e.target === btn) return;
  for (let i = 0; i < 10; i++) spawnHeart(e.clientX + (Math.random()-0.5)*120, e.clientY + (Math.random()-0.5)*120);
});
