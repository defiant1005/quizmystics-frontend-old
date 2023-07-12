export type noticeType = "primary" | "success" | "warning" | "danger";

export interface INoticeData {
  type: noticeType;
  description: string;
}
