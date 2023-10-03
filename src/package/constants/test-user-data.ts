import { IPlayers, magicSpellType } from "@/intefaces/IGame";

export const testUserData: Array<IPlayers> = [
  {
    name: "Ринат",
    room: "NLGA",
    avatar: "/src/assets/avatars/5.svg",
    isReady: true,
    userId: "vnY1fxlT3WPi7HNRAAAL",
    count: 0,
    oldCount: 0,
    isRoomAdmin: true,
    winningQuote: "123",
    stats: {
      health: 2,
      power: 2,
      magic: 5,
      intelligence: 4,
      dexterity: 2,
    },
    spellList: [
      {
        name: "coldCharm",
        label: "Криострасть",
        quantity: 2,
      },
      {
        name: "secretException",
        label: "Секретел",
        quantity: 2,
      },
      {
        name: "silenceWisdom",
        label: "Интерруптус",
        quantity: 2,
      },
      {
        name: "secretRiddle",
        label: "Секретная загадка",
        quantity: 2,
      },
      {
        name: "antagonisticRiddle",
        label: "Антаговеяние",
        quantity: 1,
      },
    ],
    curse: [
      {
        who: "IPhWqwbBgeyamfC8AAAN",
        spell: "secretException",
        evaded: true,
      },
      {
        who: "IPhWqwbBgeyamfC8AAAN2",
        spell: "secretException",
        evaded: true,
      },
    ],
  },
  {
    name: "Тест",
    room: "NLGA",
    isRoomAdmin: false,
    avatar: "/src/assets/avatars/6.svg",
    userId: "IPhWqwbBgeyamfC8AAAN",
    count: 0,
    oldCount: 0,
    isReady: true,
    winningQuote: "123",
    stats: {
      health: 4,
      power: 2,
      magic: 2,
      intelligence: 5,
      dexterity: 2,
    },
    spellList: [
      {
        name: "coldCharm",
        label: "Криострасть",
        quantity: 2,
      },
      {
        name: "secretException",
        label: "Секретел",
        quantity: 1,
      },
    ],
    curse: [
      {
        who: "vnY1fxlT3WPi7HNRAAAL",
        spell: "antagonisticRiddle",
        evaded: true,
      },
    ],
  },
  {
    name: "Тест2",
    room: "NLGA",
    avatar: "/src/assets/avatars/8.svg",
    userId: "IPhWqwbBgeyamfC8AAAN2",
    count: 0,
    oldCount: 0,
    isRoomAdmin: false,
    isReady: true,
    winningQuote: "123",
    stats: {
      health: 4,
      power: 2,
      magic: 2,
      intelligence: 5,
      dexterity: 2,
    },
    spellList: [
      {
        name: "coldCharm",
        label: "Криострасть",
        quantity: 2,
      },
      {
        name: "secretException",
        label: "Секретел",
        quantity: 1,
      },
    ],
    curse: [
      {
        who: "vnY1fxlT3WPi7HNRAAAL",
        spell: "antagonisticRiddle",
        evaded: false,
      },
    ],
  },
];

export const testQuestion = {
  id: 13,
  title: "Чему равно значение выражения 3! (факториал)?",
  answer1: "3",
  answer2: "6",
  answer3: "9",
  answer4: "12",
  categoryId: 1,
};

export const testCurse1: Array<magicSpellType> = ["coldCharm"];
export const testCurse2: Array<magicSpellType> = ["secretException"];
export const testCurse3: Array<magicSpellType> = ["silenceWisdom"];
export const testCurse4: Array<magicSpellType> = ["secretRiddle"];
export const testCurse5: Array<magicSpellType> = ["antagonisticRiddle"];
