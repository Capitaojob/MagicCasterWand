import spells from "./spells.js";
const spellGridElement = document.querySelector(".spells-grid");

function addSpellsToGrid() {
  spells.forEach((spell) => {
    const spellCardDiv = document.createElement("div");
    spellCardDiv.classList.add("spell-card");
    spellCardDiv.style.setProperty("--color", spell.color);
    spellCardDiv.style.setProperty("--transparent-color", `${spell.color}22`);

    const spellNameHeading = document.createElement("h4");
    spellNameHeading.textContent = spell.name;

    spellCardDiv.appendChild(spellNameHeading);

    const spellDescription = document.createElement("p");
    spellDescription.textContent = spell.description;
    spellDescription.classList.add("description");

    spellCardDiv.appendChild(spellDescription);

    const spellDifficulty = document.createElement("h5");
    spellDifficulty.textContent = "Difficulty: " + mapSpellDifficulty(spell.difficulty);
    spellDifficulty.classList.add("difficulty");

    spellCardDiv.appendChild(spellDifficulty);

    const spellType = document.createElement("h5");
    spellType.textContent = spell.type;
    spellType.classList.add("type");

    spellCardDiv.appendChild(spellType);

    spellGridElement.appendChild(spellCardDiv);
  });
}

function mapSpellDifficulty(difficulty) {
  switch (difficulty) {
    case 0:
      return "Easy";
    case 1:
      return "Medium";
    case 2:
      return "Difficult";
    case 3:
      return "Very Difficult";
    default:
      return "Unkown";
  }
}

addSpellsToGrid();
