export interface IQuestion {
  id: number;
  title: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  categoryId: number;
}

export interface ICheckAnswer {
  questionId: number;
  answer: string;
}

export type CheckAnswerResponseType = "good" | "bad";

export interface ICheckAnswerResponse {
  message: CheckAnswerResponseType;
}

export interface IPlayersStats {
  health: stateValue;
  power: stateValue;
  magic: stateValue;
  intelligence: stateValue;
  dexterity: stateValue;
}

export type stateValue = 1 | 2 | 3 | 4 | 5;

export interface ISpell {
  name: magicSpellType;
  label: string;
  quantity: number;
}

export interface ICurse {
  who: string;
  evaded: boolean;
  spell: magicSpellType;
}

export interface IPlayers {
  name: string;
  room: string;
  userId: string;
  count: number;
  oldCount: number;
  winningQuote: string;
  isRoomAdmin: boolean;
  avatar: string;
  isReady: boolean;
  spellList?: Array<ISpell>;
  curse: Array<ICurse>;
  stats?: IPlayersStats;
}

export interface IPlayersEditData {
  name: string;
  avatar: string;
  winningQuote: string;
  stats: IPlayersStats;
}

export type magicSpellType =
  | "coldCharm"
  | "secretException"
  | "silenceWisdom"
  | "antimagicExcess"
  | "antagonisticRiddle";
