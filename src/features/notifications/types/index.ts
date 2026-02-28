export type NotificationStatus = 'new' | 'accepted' | 'rejected' | 'completed';
export type NotificationTab = 'recent' | 'all';

export interface Notification {
  id: string;
  title: string;
  amount: string;
  time: string;
  status: NotificationStatus;
  read?: boolean;
  orderId?: string;
}