import { recognition } from "./speechRecognition.js";
import playSpellSound from "./sounds.js";
import triggerSmartHomeAction from "./smartHome.js";
import toggleTorch from "./flashlightHandler.js";

const wand = document.getElementById("wand");
const wandGlow = [document.getElementById("idle-glow"), document.getElementById("full-glow")];
let isCurrentSpellContinuous = false;
export const isMobileDevice = /Mobi|Android|iPhone/i.test(navigator.userAgent);

window.onload = function () {
  wand.addEventListener(isMobileDevice ? "touchstart" : "mousedown", () => {
    recognition.stop();
    recognition.start();

    if (!isCurrentSpellContinuous) setWandAtReady();
  });
};

export function castSpell(spell) {
  console.log(`Feitiço reconhecido: ${spell.name}`);
  document.getElementById("final-spell").textContent = `${spell.name}!`;

  wandGlow[1].style.opacity = 1;

  wandGlow[0].style.fill = spell.color;
  wandGlow[0].style.filter = `drop-shadow( 0 0 30px ${spell.color})`;

  wandGlow[1].style.fill = spell.color;
  wandGlow[1].style.filter = `drop-shadow( 0 0 50px ${spell.color})`;

  isCurrentSpellContinuous = spell.continuum;

  playSpellSound(spell);
  // if (isMobileDevice) {
  //   if (spell.name.toLowerCase().includes("lumos")) toggleTorch(true);
  //   if (spell.name.toLowerCase().includes("nox")) toggleTorch(false);
  // }

  //triggerSmartHomeAction();

  if (!spell.continuum) {
    setTimeout(() => {
      resetWand();
    }, 1200);
  }
}

function setWandAtReady() {
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
      // glowElement.style.fill = "#00f7ff";
      // glowElement.style.filter = "drop-shadow( 0 0 10px #00f7ffbb)";
    });
  }, 400);
}
