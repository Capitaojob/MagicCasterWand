const customSpellAudios = ["lumos", "nox"];

export default function playSpellSound(spell, extension = "ogg") {
  let currentSpellAudio = customSpellAudios.find((spellAudio) => spell.name.toLowerCase().includes(spellAudio));
  if (!currentSpellAudio) {
    currentSpellAudio = `generic${Math.random() > 0.5 ? "-2" : ""}`;
  }
  currentSpellAudio = `./audios/spells/${currentSpellAudio}.${extension}`;

  playSound(currentSpellAudio);
}

export function playWandSound(soundName, extension = "ogg") {
  let path = `./audios/wand/${soundName}.${extension}`;

  playSound(path);
}

function playSound(path, volume = 1) {
  const audio = new Audio(path);
  audio.volume = volume;
  audio.play();
}
