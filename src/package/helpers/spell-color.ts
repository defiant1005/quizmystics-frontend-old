import { magicSpellType } from "@/intefaces/IGame";
import assertUnreachable from "@/package/helpers/assert-unreachable";

export default function spellColor(spell: magicSpellType) {
  switch (spell) {
    case "amuletAbsoluteProtection":
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
