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
  id: number;
  answer: string;
  userId: string;
}
