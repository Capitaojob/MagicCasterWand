const wands = [
  { id: 0, name: "defiant", overlay: false, color: "#00A2AA" },
  { id: 1, name: "heroic", overlay: true, color: "#57DACA" },
];
export let currentWand = JSON.parse(localStorage.getItem("currentWand")) ?? wands[0];

export default function setWandStyles() {
  const wandDiv = document.querySelector(".wand");

  const wand = document.getElementById("wand");
  wand.src = `svg/${currentWand.name}/wand.svg`;

  const overlay = document.getElementById("overlay");
  if (currentWand.overlay) {
    overlay.style.display = "block";
    overlay.src = `svg/${currentWand.name}/overlay.svg`;
  } else {
    overlay.style.display = "none";
  }

  fetch(`svg/${currentWand.name}/idle_glow.svg`)
    .then((response) => response.text())
    .then((svgContent) => {
      const idleGlowElement = document.getElementById("idle-glow");

      if (idleGlowElement) idleGlowElement.parentElement.removeChild(idleGlowElement);

      svgContent = svgContent.replace("<svg", '<svg id="idle-glow"');
      wandDiv.innerHTML += svgContent;
    });

  fetch(`svg/${currentWand.name}/full_glow.svg`)
    .then((response) => response.text())
    .then((svgContent) => {
      const fullGlowElement = document.getElementById("full-glow");

      if (fullGlowElement) fullGlowElement.parentElement.removeChild(fullGlowElement);

      svgContent = svgContent.replace("<svg", '<svg id="full-glow"');
      wandDiv.innerHTML += svgContent;
    });
}

export function changeWandStyle(style = null) {
  if (!style) {
    const matchWand = wands.find((e) => e.name == style);
    if (matchWand != null) {
      console.log(matchWand);
      currentWand = matchWand;
    } else {
      throw new Error("Failed to find wand name");
    }
  } else {
    const nextId = (currentWand.id + 1) % wands.length;
    currentWand = wands.find((w) => w.id == nextId);
  }

  saveCurrentWand();
  setWandStyles();
}

function saveCurrentWand() {
  localStorage.setItem("currentWand", JSON.stringify(currentWand));
}

// References
// https://www.harrypottermagiccasterwand.com/
