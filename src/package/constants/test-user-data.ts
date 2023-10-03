import { IPlayers } from "@/intefaces/IGame";

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
        label: "Холодное Очарование",
        quantity: 2,
      },
      {
        name: "secretException",
        label: "Тайное Исключение",
        quantity: 2,
      },
      {
        name: "silenceWisdom",
        label: "Молчание Мудрости",
        quantity: 2,
      },
      {
        name: "antimagicExcess",
        label: "Амулет Абсолютной Защиты",
        quantity: 2,
      },
      {
        name: "antagonisticRiddle",
        label: "Антагонистическая Загадка",
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
        label: "Холодное Очарование",
        quantity: 2,
      },
      {
        name: "secretException",
        label: "Тайное Исключение",
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
        label: "Холодное Очарование",
        quantity: 2,
      },
      {
        name: "secretException",
        label: "Тайное Исключение",
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
