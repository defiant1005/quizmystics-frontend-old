export type noticeType = "primary" | "success" | "warning" | "danger";

export interface INoticeData {
  type: noticeType;
  description: string;
}

export interface IMainSelector {
  id: string;
  name: string;
}
