const customSpellAudios = ["lumos", "nox"];

export default function playSpellSound(spell) {
  let currentSpellAudio = customSpellAudios.find((spellAudio) => spell.name.toLowerCase().includes(spellAudio));
  if (!currentSpellAudio) {
    currentSpellAudio = `generic${Math.random() > 0.5 ? "-2" : ""}`;
  }
  currentSpellAudio = `./audios/spells/${currentSpellAudio}.ogg`;

  const audio = new Audio(currentSpellAudio);
  audio.volume = 1;
  audio.play();
}
