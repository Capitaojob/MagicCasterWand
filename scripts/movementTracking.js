import { isMobileDevice } from "./main.js";

export let spellRecognized = true;

window.onload = function () {
  if (isMobileDevice) {
    window.addEventListener("devicemotion", function (event) {
      const { acceleration } = event;
      console.log(event);
      updateMotionValues(acceleration);
    });
  }
};

function updateMotionValues(acceleration) {
  document.getElementById("wand-x").textContent = `X: ${acceleration.x}`;
  document.getElementById("wand-y").textContent = `Y: ${acceleration.y}`;
  document.getElementById("wand-z").textContent = `Z: ${acceleration.z}`;
  if (acceleration.x > 15 || acceleration.y > 15 || acceleration.z > 15) {
    spellRecognized = true;
    document.getElementById("right-movement").textContent = "Movimento correto!";
    setTimeout(() => {
      spellRecognized = false;
      document.getElementById("right-movement").textContent = "";
    }, 1000);
  }
}
