import { castSpell, debugMode, isCurrentSpellContinuous, isMobileDevice, resetWand, setIsRecording } from "./main.js";
import { comparePath, stopTracking } from "./movementTracking.js";
import spells from "./spells.js";

let foundSpell = false;
export const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = handleRecognitionResult;

recognition.onend = () => {
	if (!foundSpell) {
		if (!isCurrentSpellContinuous && !debugMode) resetWand();
		else if (debugMode) handleRecognitionResult({}, "expelliarmus");
	}
};

function handleRecognitionResult(event, testingSpellParam = null) {
	// Resets isRecording and movement tracking data
	setIsRecording(false);

	// Gets spoken command
	let command = "";
	// let command = event.results[0][0].transcript.toLowerCase()

	// TESTING
	if (testingSpellParam != null && testingSpellParam != "") command = testingSpellParam;
	else command = event.results[0][0].transcript.toLowerCase();
	// TESTING

	console.log("Comando reconhecido:", command);

	// Fixes some commonly misspelled commands
	command = fixSpelling(command);

	const matchedSpell = spells.find((spell) => command.includes(spell.name.toLowerCase()));
	foundSpell = matchedSpell != null;

	stopTracking(matchedSpell);

	if (foundSpell && comparePath(matchedSpell)) castSpell(matchedSpell);
}

function fixSpelling(spell) {
	switch (spell) {
		case "ridiculous":
			spell = "riddikulus";
			break;
		case "stupify":
			spell = "stupefy";
			break;
		case "crucial":
			spell = "crucio";
			break;
		case "aquaman tea":
		case "argumentative":
		case "agua mente":
			spell = "aguamenti";
			break;
		case "accu":
		case "thank you":
			spell = "accio";
			break;
		case "imperial":
			spell = "imperio";
			break;
		case "esposo":
		case "exposure":
			spell = "expulso";
			break;
		case "lumos salon":
		case "lumos solomn":
		case "lumos solomon":
		case "lumos solemn":
			spell = "lumos solem";
			break;
		case "defender":
			spell = "diffindo";
			break;
		case "vinita encantada":
		case "vinita incantation":
		case "finite encantada":
		case "finite incantation":
			spell = "finite incantatem";
			break;
		case "levy corpus":
		case "levi corpus":
			spell = "levicorpus";
			break;
		case "muffler auto":
			spell = "muffliato";
			break;
		case "protego auribus":
		case "protego ovulas":
		case "protego orbeez":
		case "protego oroville":
			spell = "protego horribilis";
			break;
		case "bombardier":
		case "bombard":
			spell = "bombarda";
			break;
		case "really show":
		case "real life show":
		case "relay show":
		case "malaysia":
			spell = "relashio";
			break;
		case "open school":
		case "boobs girl":
		case "boobs girl":
		case "old scooter":
		case "obscure":
			spell = "obscuro";
			break;
	}

	return spell;
}
