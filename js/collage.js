const grid = document.getElementById("grid");

const intro = document.getElementById("intro");
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewerImg");
const viewerCaption = document.getElementById("viewerCaption");

const captions = [
  "Onze eerste dag samen + meteen een concert 💖🎶",
  "Eerste keer samen in Rotterdam uit eten 🇳🇱🍽️💘",
  "Eerste keer echt lekker kunnen slapen bij mij 😴❤️✨",
  "Eerste house feestje samen 🎧✨❤️",
  "Eerste vakantie samen in Griekenland 🇬🇷🌞💘",
  "Samen zwemmen in Griekenland 🌊🇬🇷💙",
  "Laatste dag Griekenland 🌅🇬🇷❤️",
  "Eerste movienight samen 🍿🎬💗",
  "Eerste keer samen naar Parijs 🇫🇷🗼💞",
  "Samen op de boot in Parijs 🚤🇫🇷❤️",
  "Samen oud & nieuw vieren 🎆🥂❤️",
  "Samen nieuwjaar beginnen ✨💘🥂"
];

const total = 12;
const INTRO_TIME = 4000;
const SHOW_TIME = 4000;

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/* Hartjes regen tijdens intro (gebruikt .heart uit je CSS) */
let heartInterval = null;

function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = `${Math.random() * window.innerWidth}px`;
  heart.style.top = `${window.innerHeight + 20}px`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 2800);
}

function startHearts() {
  if (heartInterval) return;
  heartInterval = setInterval(() => {
    for (let i = 0; i < 7; i++) spawnHeart();
  }, 180);
}

function stopHearts() {
  if (!heartInterval) return;
  clearInterval(heartInterval);
  heartInterval = null;
}

function createItem(i) {
  const pad = String(i + 1).padStart(2, "0");
  const src = `assets/photos/${pad}.jpeg`;

  const div = document.createElement("div");
  div.className = "photo";
  div.innerHTML = `<img src="${src}" alt="Foto ${i + 1}">`;

  return { div, src };
}

async function run() {
  startHearts();
  await sleep(INTRO_TIME);
  stopHearts();

  intro.classList.remove("show");
  intro.setAttribute("aria-hidden", "true");
  intro.remove();

  for (let i = 0; i < total; i++) {
    const { div, src } = createItem(i);

    viewerImg.src = src;
    viewerCaption.textContent = captions[i];

    viewer.classList.add("show");
    viewer.setAttribute("aria-hidden", "false");

    await sleep(SHOW_TIME);

    viewer.classList.remove("show");
    viewer.setAttribute("aria-hidden", "true");
    await sleep(250);

    grid.appendChild(div);
    await sleep(60);
    div.classList.add("show");

    await sleep(320);
  }
}

run();
