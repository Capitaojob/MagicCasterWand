import { castSpell, debugMode, isCurrentSpellContinuous, isMobileDevice, resetWand, setIsRecording } from "./main.js";
import { comparePath, stopTracking } from "./movementTracking.js";
import fixSpelling from "./spellNormalizing.js";
import spells from "./spells.js";

let language;

let foundSpell = false;
export const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = language;
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = handleRecognitionResult;

recognition.onend = handleRecognitionEnd;

function handleRecognitionResult(event, testingSpellParam = null) {
  // Gets spoken command
  let command = "";

  // If in debug mode and a param is passed, ignores spoken words
  if (testingSpellParam != null && testingSpellParam != "" && debugMode) command = testingSpellParam;
  else command = event.results[0][0].transcript.toLowerCase();

  console.log("Comando reconhecido:", command);

  // Fixes some commonly misspelled commands
  command = fixSpelling(command, language);

  const matchedSpell = spells.find((spell) => command.includes(spell.name.toLowerCase()));
  foundSpell = matchedSpell != null;

  if (foundSpell) {
    stopTracking(matchedSpell);
    if (comparePath(matchedSpell)) castSpell(matchedSpell);
  }
}

function handleRecognitionEnd() {
  if (!foundSpell) {
    if (!isCurrentSpellContinuous && !debugMode) resetWand();
    else if (debugMode) handleRecognitionResult({}, "expelliarmus");
  }

  // Stops recording
  setIsRecording(false);
}

export function setLanguage() {
  const knownLanguages = ["pt-BR", "en-US"];
  language = knownLanguages.includes(navigator.language) ? navigator.language : knownLanguages[knownLanguages.length - 1];
  document.getElementById("language").textContent = language;
}
