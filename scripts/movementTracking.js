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
	return comparePath(path, spells[matchedSpell.name]);
}

function handleDeviceMotion(event) {
	if (!isRecording) return;

	const { x, y } = event.acceleration;
	path.push([x, y]);
}

export function comparePath(spell) {
	const spellPath = spell.path;

	// TESTING
	path = debugMode
		? [
				[0.1, 0],
				[0.3, 0.1],
				[0.1, -0.1],
				[0.3, 0],
				[0.1, 0.2],
				[0.2, 0.4],
				[-0.1, 0.1],
				[-0.1, 0],
		  ]
		: [];
	// TESTING

	// If spell does not have a defined path or if it is not a mobile device, check only spelling
	if (!spell.path || (!isMobileDevice && !debugMode)) return true;

	const normalizedPath = normalizePath(spellPath.length);

	// TESTING
	const wandMovementElement = document.getElementById("wand-movement");
	normalizedPath.forEach((path, index) => {
		const pathElement = document.createElement("h2");
		pathElement.textContent = `X: ${path[0].toFixed(2)} | Y: ${path[1].toFixed(2)} -- X: ${spellPath[index][0].toFixed(2)} | Y: ${spellPath[index][1].toFixed(2)}`;
		pathElement.style.display = "block";
		wandMovementElement.appendChild(pathElement);
	});
	// TESTING

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

// x+ = right
// x- = left
// y+ = up
// y- = down
// x+ y+ = up right
// x+ y- = down right
// x- y+ = up left
// x- y- = down left
