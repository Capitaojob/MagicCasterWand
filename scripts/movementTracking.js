import { isMobileDevice } from "./main.js";

export let spellRecognized = true;

window.onload = function () {
  if (isMobileDevice && false) {
    //not yet implemented
    window.addEventListener("devicemotion", function (event) {
      const { acceleration } = event;
      console.log(event);
      updateMotionValues(acceleration);
    });
  }
};

function updateMotionValues(acceleration) {
  // document.getElementById("wand-x").textContent = `X: ${acceleration.x.toFixed(2)}`;
  // document.getElementById("wand-y").textContent = `Y: ${acceleration.y.toFixed(2)}`;
  // document.getElementById("wand-z").textContent = `Z: ${acceleration.z.toFixed(2)}`;
  if (acceleration.x > 15 || acceleration.y > 15 || acceleration.z > 15) {
    spellRecognized = true;
    document.getElementById("right-movement").textContent = "Movimento correto!";
    setTimeout(() => {
      spellRecognized = false;
      document.getElementById("right-movement").textContent = "";
    }, 1000);
  }
}
