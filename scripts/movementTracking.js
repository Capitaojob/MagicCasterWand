import { debugMode, isMobileDevice, isRecording, setIsRecording } from "./main.js";
import spells from "./spells.js";

let path = [];
export let spellRecognized = false;
const threshold = 0.2;

export default function startTracking() {
  window.addEventListener("devicemotion", handleDeviceMotion);
}

export function stopTracking(matchedSpell) {
  window.removeEventListener("devicemotion", handleDeviceMotion);
  return comparePath(matchedSpell);
}

function handleDeviceMotion(event) {
  if (!isRecording) return;

  const { x, y } = event.acceleration;
  path.push([x, y]);
}

export function comparePath(spell) {
  const spellPath = spell.path;

  // TESTING
  if (debugMode)
    path = [
      [0.1, 0],
      [0.3, 0.1],
      [0.1, -0.1],
      [0.3, 0],
      [0.1, 0.2],
      [0.2, 0.4],
      [-0.1, 0.1],
      [-0.1, 0],
    ];
  // TESTING

  // If spell does not have a defined path or if it is not a mobile device, check only spelling
  if (!spell.path || (!isMobileDevice && !debugMode)) return true;

  const normalizedPath = normalizePath(spellPath.length);

  const normalizedCardinals = normalizePathAngles(spellPath.length);

  // TESTING
  const wandMovementElement = document.getElementById("wand-movement");
  normalizedCardinals.forEach((path, index) => {
    wandMovementElement.textContent += `${path}, `;
  });
  // TESTING

  // normalizedPath.forEach((path, index) => {
  //   const pathElement = document.createElement("h2");
  //   // pathElement.textContent = `X: ${path[0].toFixed(2)} | Y: ${path[1].toFixed(2)} -- X: ${spellPath[index][0].toFixed(2)} | Y: ${spellPath[index][1].toFixed(2)}`;
  //   pathElement.textContent = `X: ${path[0].toFixed(2)} | Y: ${path[1].toFixed(2)}`;
  //   setTimeout(() => {
  //     pathElement.textContent = "";
  //   }, 5000);
  //   pathElement.style.display = "block";
  //   wandMovementElement.appendChild(pathElement);
  // });

  return normalizedPath.every((step, i) => {
    return Math.abs(Math.abs(step[0]) - Math.abs(spellPath[i][0])) < threshold && Math.abs(Math.abs(step[1]) - Math.abs(spellPath[i][1])) < threshold;
  });
}

function normalizePath(steps) {
  const segmentSize = Math.floor(path.length / steps);
  const normalizedPath = [];

  for (let i = 0; i < steps; i++) {
    let sumX = 0,
      sumY = 0;
    for (let j = 0; j < segmentSize; j++) {
      const [x, y] = path[i * segmentSize + j];
      sumX += x;
      sumY += y;
    }

    normalizedPath.push([sumX / segmentSize, sumY / segmentSize]);
  }

  return normalizedPath;
}

// REFERENCE: SCREEN FACING USER
// -x = right
// +x = left
// -y = up
// +y = down

// if (Math.abs(Math.abs(x) - Math.abs(y))) > threshold) angle is 0, 90, 180 or -90
// else angle is 45, 135, -135, -45
// 90 is up, -90 is down, 0 is right, -180 is left
// 45 is up and right, 135 is up and left, -135 is down and left, -45 is down and right
function normalizePathAngles(steps) {
  const segmentSize = Math.floor(path.length / steps);
  const normalizedPath = [];
  const threshold = 0.1;

  for (let i = 0; i < steps; i++) {
    let sumX = 0,
      sumY = 0;

    for (let j = 0; j < segmentSize; j++) {
      const [x, y] = path[i * segmentSize + j];
      sumX += x;
      sumY += y;
    }

    const avgX = sumX / segmentSize;
    const avgY = sumY / segmentSize;

    // Calcula o ângulo em graus.
    const angle = Math.atan2(avgY, avgX) * (180 / Math.PI);

    let direction;

    if (Math.abs(Math.abs(avgX) - Math.abs(avgY)) > threshold) {
      // Ângulos retos (0, 90, 180, -90)
      if (angle >= -45 && angle < 45) {
        direction = "left";
      } else if (angle >= 45 && angle < 135) {
        direction = "down";
      } else if (angle >= 135 || angle < -135) {
        direction = "right";
      } else {
        direction = "up";
      }
    } else {
      // Ângulos diagonais (45, 135, -135, -45)
      if (angle >= 0 && angle < 90) {
        direction = "down left";
      } else if (angle >= 90 && angle < 180) {
        direction = "down right";
      } else if (angle < 0 && angle >= -90) {
        direction = "up left";
      } else {
        direction = "up right";
      }
    }

    normalizedPath.push(direction);
  }

  return normalizedPath;
}
