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
  document.getElementById("recognised-movement").textContent = `X: ${acceleration.x} | Y: ${acceleration.y} | Z: ${acceleration.z}`;
  if (acceleration.x > 15 || acceleration.y > 15 || acceleration.z > 15) {
    spellRecognized = true;
    document.getElementById("right-movement").textContent = "Movimento correto!";
    setTimeout(() => {
      spellRecognized = false;
      document.getElementById("right-movement").textContent = "";
    }, 1000);
  }
}
