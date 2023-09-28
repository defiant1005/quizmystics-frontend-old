export type noticeType = "primary" | "success" | "warning" | "danger";

export interface INoticeData {
  type: noticeType;
  description: string;
}

export interface IMainSelector {
  id: string;
  name: string;
}

export interface ICbData {
  error: boolean;
  message?: string;
}

export type buttonColor = "blue" | "green" | "pink" | "red" | "yellow";
