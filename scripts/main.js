import { recognition, setLanguage } from "./speechRecognition.js";
import playSpellSound, { playWandSound } from "./sounds.js";
import toggleTorch from "./flashlightHandler.js";
import startTracking from "./movementTracking.js";
import setWandStyles, { changeWandStyle, currentWand } from "./wandRender.js";

export const debugMode = false;
const wandClassElement = document.querySelector(".wand");
export const isMobileDevice = /Mobi|Android|iPhone/i.test(navigator.userAgent);
export let isRecording = false;
export let isCurrentSpellContinuous = false;

// General Initializations
window.onload = function () {
  setWandStyles();
  setLanguage();

  wandClassElement.addEventListener(isMobileDevice ? "touchstart" : "mousedown", () => {
    readyWand();
  });

  wandClassElement.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  document.getElementById("change-wand").addEventListener("click", changeWandStyle);
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
  const glowingWandElements = [document.getElementById("idle-glow"), document.getElementById("full-glow")];
  glowingWandElements.forEach((glowElement) => {
    glowElement.style.fill = "#00f7ff";
    glowElement.style.filter = "drop-shadow( 0 0 10px #00f7ffbb)";
  });
}

export function resetWand() {
  setTimeout(() => {
    const glowingWandElements = [document.getElementById("idle-glow"), document.getElementById("full-glow")];
    glowingWandElements[1].style.opacity = 0;

    glowingWandElements.forEach((glowElement) => {
      // glowElement.style.fill = "#00a2aa";
      glowElement.style.fill = currentWand.color;
      glowElement.style.filter = "none";
      document.getElementById("final-spell").textContent = "";
    });
  }, 400);
}

export function castSpell(spell) {
  console.log(`Feitiço reconhecido: ${spell.name}`);
  document.getElementById("final-spell").textContent = `${spell.name}!`;

  const glowingWandElements = [document.getElementById("idle-glow"), document.getElementById("full-glow")];
  glowingWandElements[1].style.opacity = 1;

  glowingWandElements.forEach((glowingElement) => {
    const color = spell.color == "base" ? currentWand.color : spell.color;

    glowingElement.style.fill = color;
    glowingElement.style.filter = `drop-shadow( 0 0 20px ${color})`;
  });
  // glowingWandElements[0].style.fill = spell.color;
  // glowingWandElements[0].style.filter = `drop-shadow( 0 0 20px ${spell.color})`;

  // glowingWandElements[1].style.fill = spell.color;
  // glowingWandElements[1].style.filter = `drop-shadow( 0 0 20px ${spell.color})`;

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
