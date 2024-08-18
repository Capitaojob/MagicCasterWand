const customSpellAudios = ["lumos"];

export default function playSpellSound(spell) {
  let currentSpellAudio = customSpellAudios.find((spellAudio) => spell.name.toLowerCase().includes(spellAudio));
  currentSpellAudio = `./audios/spells/${currentSpellAudio ? currentSpellAudio : "generic"}.ogg`;

  const audio = new Audio(currentSpellAudio);
  audio.volume = 1;
  audio.play();
}
