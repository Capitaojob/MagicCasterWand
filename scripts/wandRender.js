import { resetWand, setIsRecording } from "./main.js";
import { recognition } from "./speechRecognition.js";

const wands = [
  { id: 0, name: "defiant", overlay: false, color: "#57da95" }, //924ab6
  { id: 1, name: "heroic", overlay: true, color: "#00A2AA" }, //57DACA
  { id: 2, name: "loyal", overlay: false, color: "#D7AA37" },
  { id: 3, name: "honourable", overlay: true, color: "#CF3A0A" },
];
export let currentWand = JSON.parse(localStorage.getItem("currentWand")) ?? wands[0];
let wandNameTimeout = null;
let wandPointerEventsTimeout = null;

export default function setWandStyles() {
  const wandDiv = document.querySelector(".wand");

  const wand = document.getElementById("wand");
  wand.src = `svg/${currentWand.name}/wand.svg`;

  const overlay = document.getElementById("overlay");
  if (currentWand.overlay) {
    overlay.style.display = "block";
    overlay.src = `svg/${currentWand.name}/overlay.svg`;
  } else {
    overlay.style.display = "none";
  }

  fetch(`svg/${currentWand.name}/idle_glow.svg`)
    .then((response) => response.text())
    .then((svgContent) => {
      const idleGlowElement = document.getElementById("idle-glow");

      if (idleGlowElement) idleGlowElement.parentElement.removeChild(idleGlowElement);

      svgContent = svgContent.replace("<svg", '<svg id="idle-glow"');
      wandDiv.innerHTML += svgContent;
    });

  fetch(`svg/${currentWand.name}/full_glow.svg`)
    .then((response) => response.text())
    .then((svgContent) => {
      const fullGlowElement = document.getElementById("full-glow");

      if (fullGlowElement) fullGlowElement.parentElement.removeChild(fullGlowElement);

      svgContent = svgContent.replace("<svg", '<svg id="full-glow"');
      wandDiv.innerHTML += svgContent;
    });

  resetWand();
}

export function changeWandStyle(style = null) {
  if (!style) {
    const matchWand = wands.find((e) => e.name == style);
    if (matchWand != null) {
      console.log(matchWand);
      currentWand = matchWand;
    } else {
      throw new Error("Failed to find wand name");
    }
  } else {
    const nextId = (currentWand.id + 1) % wands.length;
    currentWand = wands.find((w) => w.id == nextId);
  }

  recognition.stop();
  showWandName();
  setIsRecording(false);
  saveCurrentWand();
  setWandStyles();

  const wandElement = document.querySelector(".wand");
  wandElement.style.pointerEvents = "none";

  if (wandPointerEventsTimeout != null) {
    clearTimeout(wandPointerEventsTimeout);
    wandPointerEventsTimeout = null;
  }

  wandPointerEventsTimeout = setTimeout(() => (wandElement.style.pointerEvents = "all"), 500);
}

export function showWandName() {
  const wandNameElement = document.getElementById("wand-name");
  wandNameElement.textContent = currentWand.name;
  wandNameElement.style.opacity = 1;

  if (wandNameTimeout != null) {
    clearTimeout(wandNameTimeout);
    wandNameTimeout = null;
  }

  wandNameTimeout = setTimeout(() => {
    wandNameElement.style.opacity = 0;
  }, 3000);
}

function saveCurrentWand() {
  localStorage.setItem("currentWand", JSON.stringify(currentWand));
}

// References
// https://www.harrypottermagiccasterwand.com/
