import { recognition, setLanguage } from "./speechRecognition.js";
import playSpellSound, { playWandSound } from "./sounds.js";
import toggleTorch from "./flashlightHandler.js";
import startTracking from "./movementTracking.js";

export const debugMode = false;
const wand = document.getElementById("wand");
const wandGlow = [document.getElementById("idle-glow"), document.getElementById("full-glow")];
export const isMobileDevice = /Mobi|Android|iPhone/i.test(navigator.userAgent);
export let isRecording = false;
export let isCurrentSpellContinuous = false;

// General Initializations
window.onload = function () {
  setLanguage();

  wand.addEventListener(isMobileDevice ? "touchstart" : "mousedown", () => {
    readyWand();
  });

  wand.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
};

function readyWand() {
  if (isRecording) return;

  if (!isCurrentSpellContinuous) setWandAtReadyVisuals();
  if (!isMobileDevice) playWandSound("wand-ready");

  // Restarts speech recognition
  recognition.stop();
  recognition.start();

  // Sets control variable
  setIsRecording(true);

  // Tracks movement if is mobileDevice
  if (isMobileDevice) startTracking();
}

function setWandAtReadyVisuals() {
  wandGlow.forEach((glowElement) => {
    glowElement.style.fill = "#00f7ff";
    glowElement.style.filter = "drop-shadow( 0 0 10px #00f7ffbb)";
  });
}

export function resetWand() {
  setTimeout(() => {
    wandGlow[1].style.opacity = 0;

    wandGlow.forEach((glowElement) => {
      glowElement.style.fill = "#00a2aa";
      glowElement.style.filter = "none";
      document.getElementById("final-spell").textContent = "";
    });
  }, 400);
}

export function castSpell(spell) {
  console.log(`Feitiço reconhecido: ${spell.name}`);
  document.getElementById("final-spell").textContent = `${spell.name}!`;

  wandGlow[1].style.opacity = 1;

  wandGlow[0].style.fill = spell.color;
  wandGlow[0].style.filter = `drop-shadow( 0 0 20px ${spell.color})`;

  wandGlow[1].style.fill = spell.color;
  wandGlow[1].style.filter = `drop-shadow( 0 0 20px ${spell.color})`;

  isCurrentSpellContinuous = spell.continuum;

  playSpellSound(spell);

  // Toggles phone flashlight
  if (isMobileDevice) {
    if (spell.name.toLowerCase().includes("lumos")) toggleTorch(true);
    if (spell.name.toLowerCase().includes("nox")) toggleTorch(false);
  }

  if (!isCurrentSpellContinuous) {
    setTimeout(() => {
      resetWand();
    }, 1200);
  }
}

export function setIsRecording(value) {
  isRecording = value;
}
