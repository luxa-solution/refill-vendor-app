import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Notification, NotificationStatus } from '../types';

interface Props {
  notification: Notification;
  onPress: (notification: Notification) => void;
}

const STATUS_CONFIG: Record<NotificationStatus, { label: string; color: string; bgColor: string }> = {
  new: {
    label: 'New Order',
    color: '#fb923c',
    bgColor: '#fff7ed',
  },
  accepted: {
    label: 'Accepted',
    color: '#22c55e',
    bgColor: '#f0fdf4',
  },
  rejected: {
    label: 'Rejected',
    color: '#ef4444',
    bgColor: '#fef2f2',
  },
  completed: {
    label: 'Completed',
    color: '#22c55e',
    bgColor: '#f0fdf4',
  },
};

const NotificationCard: React.FC<Props> = ({ notification, onPress }) => {
  const { title, amount, time, status, read } = notification;
  const config = STATUS_CONFIG[status];

  return (
    <TouchableOpacity 
      style={[styles.card, !read && styles.unreadCard]} 
      onPress={() => onPress(notification)}
      activeOpacity={0.7}
    >
      {!read && <View style={styles.unreadDot} />}

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>

          <View style={[styles.statusPill, { backgroundColor: config.bgColor }]}>
            <Text style={[styles.statusText, { color: config.color }]}>
              {config.label}
            </Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.amount}>{amount}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    position: 'relative',
  },
  unreadCard: {
    backgroundColor: '#fef3c7',
    borderColor: '#fcd34d',
  },
  unreadDot: {
    position: 'absolute',
    top: 16,
    left: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fb923c',
  },
  content: {
    marginLeft: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    lineHeight: 20,
  },
  statusPill: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fb923c',
  },
  time: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default NotificationCard;