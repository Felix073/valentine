const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const loveText = document.getElementById("loveText");

const typeTitle = document.getElementById("typeTitle");

// PAS DIT AAN
const YOUR_EMAIL = "felix.marfo@outlook.com";

/* Title woord voor woord */
function typeWords(el, text, delay = 260) {
  const words = text.split(" ");
  el.textContent = "";
  let i = 0;

  function add() {
    if (i >= words.length) return;
    el.textContent += (i === 0 ? "" : " ") + words[i];
    i += 1;
    setTimeout(add, delay);
  }
  add();
}

/* Startpositie: No naast Yes */
function placeNoNextToYes() {
  const yesRect = yesBtn.getBoundingClientRect();
  const x = yesRect.right + 20;
  const y = yesRect.top + yesRect.height / 2;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = `translate(0, -50%)`;
  noBtn.style.position = "fixed";
}

/* No vrij over hele pagina */
function moveNoButton() {
  const pad = 12;
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = window.innerWidth - btnRect.width - pad * 2;
  const maxY = window.innerHeight - btnRect.height - pad * 2;

  const x = pad + Math.random() * Math.max(0, maxX);
  const y = pad + Math.random() * Math.max(0, maxY);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = "translate(0,0)";
}

function dodge(e) {
  e.preventDefault();
  moveNoButton();
}

noBtn.addEventListener("pointerenter", dodge, { passive: false });
noBtn.addEventListener("pointerdown", dodge, { passive: false });
noBtn.addEventListener("touchstart", dodge, { passive: false });

document.addEventListener("pointermove", (e) => {
  const r = noBtn.getBoundingClientRect();
  const near =
    Math.abs(e.clientX - (r.left + r.width / 2)) < 140 &&
    Math.abs(e.clientY - (r.top + r.height / 2)) < 110;
  if (near) moveNoButton();
});

/* Popup tekst */
function buildLoveMessage() {
  return [
    "Bea, thank you for accepting me to be your valentine.",
    "",
    "Ik heb de afgelopen maanden zoveel plezier gehad met jou.",
    "Jij hebt mij laten zien wat echte liefde kan betekenen, op een manier die ik nooit vergeet.",
    "",
    "Ik ben blij dat je er voor mij bent, dat je me begrijpt en dat je altijd klaarstaat.",
    "Dat wil ik ook altijd voor jou doen, zonder twijfel.",
    "",
    "Met jou voelt zelfs iets simpels speciaal.",
    "Ik kijk uit naar alles wat nog komt, elke herinnering die we nog gaan maken.",
    "",
    "Thank you so much babes, I love you.",
    "",
    "Kind regards,",
    "Felix your bebe❤️"
  ].join("\n");
}

function openMailDraft() {
  const subject = encodeURIComponent("Valentine: YES 💖");
  const body = encodeURIComponent(
    "She clicked YES.\n\n" +
    "Date: " + new Date().toLocaleString() + "\n"
  );
  window.location.href = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
}

function showPopup() {
  loveText.textContent = buildLoveMessage();
  popup.classList.add("show");
}

yesBtn.addEventListener("click", () => {
  noBtn.style.display = "none";
  showPopup();

  // Mail openen na 10 seconden
  setTimeout(openMailDraft, 10000);
});

closePopup.addEventListener("click", () => {
  popup.classList.remove("show");
});

/* Init */
window.addEventListener("load", () => {
  typeWords(typeTitle, "Will you be my valentine?", 260);
  placeNoNextToYes();
});

window.addEventListener("resize", placeNoNextToYes);

