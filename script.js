const pages = [...document.querySelectorAll(".page")];
const toast = document.getElementById("toast");
const song = document.getElementById("birthdaySong");
let currentMood = "";
let toastTimer;

function showPage(id) {
  pages.forEach(page => page.classList.toggle("active", page.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (id === "finale") confetti(55);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.getElementById("startBtn").addEventListener("click", () => showPage("vibe"));

const moodMessages = {
  soft: "Soft mode activated. Deploying extra hugs and tissues. 🥹",
  chaos: "Chaos mode selected. The penguin has already lost the cake. 😎",
  sparkle: "Main-character mode! Please proceed like the icon you are. ✨"
};

document.querySelectorAll(".mood").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".mood").forEach(item => item.classList.remove("chosen"));
    button.classList.add("chosen");
    currentMood = button.dataset.mood;
    document.getElementById("moodReply").textContent = moodMessages[currentMood];
  });
});

document.getElementById("moodNext").addEventListener("click", () => {
  if (!currentMood) {
    showToast("Choose your birthday mood first, Kal ♡");
    return;
  }
  showPage("memories");
});

document.getElementById("memoryNext").addEventListener("click", () => showPage("scrapbook"));
document.getElementById("letterNext").addEventListener("click", () => showPage("letter"));

const envelopeBtn = document.getElementById("envelopeBtn");
const letterCard = document.getElementById("letterCard");
const wishBtn = document.getElementById("wishBtn");
let letterOpened = false;

envelopeBtn.addEventListener("click", () => {
  letterOpened = !letterOpened;
  letterCard.classList.toggle("hidden", !letterOpened);
  wishBtn.classList.toggle("hidden", !letterOpened);
  envelopeBtn.classList.toggle("opened", letterOpened);
  envelopeBtn.querySelector(".envelope-hint").textContent = letterOpened ? "letter opened ♡" : "tap to open";
  if (letterOpened) {
    letterCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    confetti(18);
  }
});

wishBtn.addEventListener("click", () => {
  confetti(70);
  showToast("Make a wish, Kal. The universe is taking notes. ✨");
  setTimeout(() => showPage("finale"), 1200);
});

document.getElementById("againBtn").addEventListener("click", () => {
  song.pause();
  song.currentTime = 0;
  currentMood = "";
  letterOpened = false;
  letterCard.classList.add("hidden");
  wishBtn.classList.add("hidden");
  document.querySelectorAll(".mood").forEach(item => item.classList.remove("chosen"));
  document.getElementById("moodReply").textContent = "Tap one. It is scientifically important.";
  showPage("welcome");
});

document.getElementById("musicBtn").addEventListener("click", async () => {
  const status = document.getElementById("musicStatus");
  if (song.paused) {
    try {
      await song.play();
      status.textContent = "Now playing Kal's song. 🎶";
      document.getElementById("musicBtn").textContent = "Ⅱ Pause her song";
    } catch (error) {
      status.textContent = "Couldn't find song.mp3. Add her song next to index.html, style.css, and script.js.";
      showToast("Add your music file as song.mp3 first ♡");
    }
  } else {
    song.pause();
    status.textContent = "Song paused. Tap whenever you want the soundtrack back.";
    document.getElementById("musicBtn").textContent = "♫ Play her song";
  }
});

function confetti(amount = 35) {
  const symbols = ["💗", "✨", "🎉", "🌸", "💌", "⭐", "♡"];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    Object.assign(piece.style, {
      position: "fixed",
      zIndex: 30,
      top: "-30px",
      left: `${Math.random() * 100}vw`,
      fontSize: `${14 + Math.random() * 16}px`,
      pointerEvents: "none",
      animation: `confettiFall ${2.3 + Math.random() * 2.5}s linear forwards`
    });
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5200);
  }
}

// Keyboard support: Enter/Space works naturally on all buttons.
