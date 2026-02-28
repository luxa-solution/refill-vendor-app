import { useState, useEffect, useCallback } from 'react';
import { Notification, NotificationTab } from '../types';

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'A 10kg refill request was placed.',
    amount: '₦7,000',
    time: '2 min. ago',
    status: 'new',
    read: false,
  },
  {
    id: '2',
    title: 'A 10kg refill request was placed.',
    amount: '₦7,000',
    time: '2 min. ago',
    status: 'accepted',
    read: false,
  },
  {
    id: '3',
    title: 'A 10kg refill request was placed.',
    amount: '₦7,000',
    time: '2 min. ago',
    status: 'rejected',
    read: true,
  },
  {
    id: '4',
    title: 'A 10kg refill request was placed.',
    amount: '₦7,000',
    time: '2 min. ago',
    status: 'completed',
    read: true,
  },
  {
    id: '5',
    title: 'A 12.5kg refill request was placed with delivery option.',
    amount: '₦8,500',
    time: '1 hour ago',
    status: 'new',
    read: false,
  },
  {
    id: '6',
    title: 'A 6kg refill request was placed.',
    amount: '₦4,500',
    time: '3 hours ago',
    status: 'accepted',
    read: true,
  },
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setNotifications(MOCK_NOTIFICATIONS);
        setUnreadCount(MOCK_NOTIFICATIONS.filter(n => !n.read).length);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(async () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  }, []);

  const getFilteredNotifications = useCallback((tab: NotificationTab) => {
    if (tab === 'recent') {
      return notifications.slice(0, 5);
    }
    return notifications;
  }, [notifications]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    getFilteredNotifications,
    refresh: fetchNotifications,
  };
};