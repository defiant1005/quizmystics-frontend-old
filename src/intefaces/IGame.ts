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
