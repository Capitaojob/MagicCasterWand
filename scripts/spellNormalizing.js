export default function fixSpelling(spell, language) {
  if (language == "pt-BR") {
    switch (spell) {
      case "impérios":
      case "império":
        spell = "imperio";
        break;
      case "alô romo":
      case "alô romora":
      case "aloha moura":
      case "aloha":
        spell = "alohomora";
        break;
      case "espelharmos":
        spell = "expelliarmus";
        break;
      case "akio":
      case "acqio":
      case "águia":
      case "pátio":
        spell = "accio";
        break;
      case "estupefaça":
        spell = "stupefy";
        break;
      case "ridículos":
        spell = "riddikulus";
        break;
      case "água mente":
        spell = "aguamenti";
        break;
      case "lumos máxima":
        spell = "lumos maxima";
        break;
      case "defendo":
      case "de finda":
      case "defina":
      case "definido":
        spell = "diffindo";
        break;
      case "finita encantada":
      case "finito encantada":
        spell = "finite incantatem";
        break;
      case "incêndio":
        spell = "incendio";
        break;
      case "live corpus":
      case "levi corpus":
      case "levy corpus":
        spell = "levicorpus";
        break;
      case "muffato":
      case "mochilas":
        spell = "muffliato";
        break;
      case "protego ribs":
      case "protego ribas":
      case "protego ribes":
        spell = "protego horribilis";
        break;
      case "bombarda máxima":
        spell = "bombarda maxima";
        break;
      case "protejo":
        spell = "protego";
        break;
      case "relaxa":
      case "relaxo":
      case "relaxe-o":
        spell = "relashio";
        break;
      case "silêncio":
        spell = "silencio";
        break;
      case "nós":
        spell = "nox";
        break;
    }
  } else {
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
      case "lumos solon":
      case "lumos solomn":
      case "lumos solomon":
      case "lumos solemn":
      case "lumos selling":
        spell = "lumos solem";
        break;
      case "defender":
        spell = "diffindo";
        break;
      case "vinita encantada":
      case "vinita incantation":
      case "finite encantada":
      case "finite incantation":
      case "fishing contacting":
      case "finishing contacting":
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
  }

  return spell;
}
