import { stateValue } from "@/intefaces/IGame";
import assertUnreachable from "@/package/helpers/assert-unreachable";

export function chanceDexterity(dexterity: stateValue) {
  switch (dexterity) {
    case 0:
      return 0.07;

    case 1:
      return 0.07;

    case 2:
      return 0.14;

    case 3:
      return 0.21;

    case 4:
      return 0.28;

    case 5:
      return 0.35;

    default:
      return assertUnreachable(dexterity);
  }
}

export function chanceDexterityStringPercent(dexterityPercent: number) {
  return (dexterityPercent * 100).toFixed(0) + "%";
}
