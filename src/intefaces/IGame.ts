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
  health: number;
  power: number;
  magic: number;
  intelligence: number;
  dexterity: number;
}

export interface IPlayers {
  name: string;
  room: string;
  userId: string;
  count: number;
  oldCount: number;
  isRoomAdmin: boolean;
  avatar: string;
  isReady?: boolean;
  stats?: IPlayersStats;
}

export interface IPlayersEditData {
  name: string;
  health: number;
  power: number;
  magic: number;
  intelligence: number;
  dexterity: number;
}
