import { recognition } from "./speechRecognition.js";
import triggerSmartHomeAction from "./smartHome.js";
import playSpellSound from "./sounds.js";
import toggleTorch from "./flashlightHandler.js";

const wand = document.getElementById("wand");
const wandGlow = [document.getElementById("idle-glow"), document.getElementById("full-glow")];
export const isMobileDevice = /Mobi|Android|iPhone/i.test(navigator.userAgent);

recognition.start();

export function castSpell(spell) {
  console.log(`Feitiço reconhecido: ${spell.name}`);
  document.getElementById("final-spell").textContent = `${spell.name}!`;

  wandGlow[1].style.opacity = 1;

  wandGlow[0].style.fill = spell.color;
  wandGlow[0].style.filter = `drop-shadow( 0 0 30px ${spell.color})`;

  wandGlow[1].style.fill = spell.color;
  wandGlow[1].style.filter = `drop-shadow( 0 0 50px ${spell.color})`;

  playSpellSound(spell);
  if (isMobileDevice) toggleTorch(true);

  //triggerSmartHomeAction();

  if (!spell.continuum) {
    setTimeout(() => {
      resetWand();
      toggleTorch(false);
    }, 1200);
  }
}

function resetWand() {
  setTimeout(() => {
    wandGlow.forEach((glowElement) => {
      wandGlow[1].style.opacity = 0;
      glowElement.style.fill = "#00f7ff";
      glowElement.style.filter = "drop-shadow( 0 0 10px #00f7ffbb)";
    });
  }, 400);
}
