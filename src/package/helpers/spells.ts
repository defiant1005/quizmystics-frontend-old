import { magicSpellType } from "@/intefaces/IGame";
import assertUnreachable from "@/package/helpers/assert-unreachable";

export function spellColor(spell: magicSpellType) {
  switch (spell) {
    case "secretRiddle":
      return "#1947E5";

    case "antagonisticRiddle":
      return "#FF89BB";

    case "coldCharm":
      return "#FFBD12";

    case "secretException":
      return "#00C6AE";

    case "silenceWisdom":
      return "#F95A2C";

    default:
      return assertUnreachable(spell);
  }
}

export function spellName(spell: magicSpellType) {
  switch (spell) {
    case "secretRiddle":
      return "Секретная загадка";

    case "antagonisticRiddle":
      return "Антаговеяние";

    case "coldCharm":
      return "Криострасть";

    case "secretException":
      return "Секретел";

    case "silenceWisdom":
      return "Интерруптус";

    default:
      return assertUnreachable(spell);
  }
}
