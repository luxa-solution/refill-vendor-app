import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNotifications } from '../../src/features/notifications/hooks/useNotifications';
import { colors } from '../../src/theme/colors';


type NotificationStatus = 'new' | 'accepted' | 'rejected' | 'completed';
interface Notification {
  id: string;
  title: string;
  amount: string;
  time: string;
  status: NotificationStatus;
  read?: boolean;
  orderId?: string;
}

type NotificationTab = 'recent' | 'all';

export default function NotificationsScreen() {
  const [activeTab, setActiveTab] = useState<NotificationTab>('recent');
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const filteredNotifications = activeTab === 'recent' 
    ? notifications.slice(0, 5) 
    : notifications;

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'new':
        return { 
          label: 'New Order', 
          color: '#fb923c', 
          bgColor: '#fff7ed',
          icon: 'notifications-outline',
          iconColor: '#fb923c'
        };
      case 'accepted':
        return { 
          label: 'Accepted', 
          color: '#22c55e', 
          bgColor: '#f0fdf4',
          icon: 'checkmark-circle',
          iconColor: '#22c55e'
        };
      case 'rejected':
        return { 
          label: 'Rejected', 
          color: '#ef4444', 
          bgColor: '#fef2f2',
          icon: 'close-circle',
          iconColor: '#ef4444'
        };
      case 'completed':
        return { 
          label: 'Completed', 
          color: '#22c55e', 
          bgColor: '#f0fdf4',
          icon: 'checkmark-done-circle',
          iconColor: '#22c55e'
        };
      default:
        return { 
          label: status, 
          color: '#6b7280', 
          bgColor: '#f3f4f6',
          icon: 'notifications-outline',
          iconColor: '#6b7280'
        };
    }
  };

  const handleNotificationPress = async (notification: Notification) => {
    if (!notification.read) {
      await markAsRead(notification.id);
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => {
    const statusConfig = getStatusConfig(item.status);
    
    return (
      <TouchableOpacity 
        style={[styles.card, !item.read && styles.unreadCard]}
        onPress={() => handleNotificationPress(item)}
        activeOpacity={0.7}
      >
        {!item.read && <View style={styles.unreadDot} />}
        
        <View style={styles.cardContent}>
          <View style={styles.topRow}>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <View style={[styles.statusPill, { backgroundColor: statusConfig.bgColor }]}>
              <Ionicons name={statusConfig.icon as any} size={14} color={statusConfig.iconColor} style={styles.statusIcon} />
              <Text style={[styles.statusText, { color: statusConfig.color }]}>
                {statusConfig.label}
              </Text>
            </View>
          </View>

          <View style={styles.bottomRow}>
            <Text style={styles.amount}>{item.amount}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIcon}>
        <Ionicons name="notifications-off-outline" size={48} color="#9ca3af" />
      </View>
      <Text style={styles.emptyTitle}>No notifications</Text>
      <Text style={styles.emptyMessage}>
        {activeTab === 'recent' 
          ? "You don't have any recent notifications"
          : "You don't have any notifications yet"}
      </Text>
    </View>
  );

  const handleMarkAllAsRead = async () => {
    if (unreadCount > 0) {
      await markAllAsRead();
    }
  };

  return (
    <>
      <Stack.Screen options={{ 
        headerShown: true,
        title: 'Notifications',
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
          color: colors.textDark,
        },
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} style={styles.headerLeft}>
            <Ionicons name="chevron-back" size={24} color={colors.textDark} />
          </TouchableOpacity>
        ),
        headerRight: () => null,
      }} />
      
      <View style={styles.container}>
        {/* Tabs and Mark All Row */}
        <View style={styles.tabsRow}>
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'recent' && styles.activeTab]}
              onPress={() => setActiveTab('recent')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'recent' && styles.activeTabText
              ]}>
                Recent
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === 'all' && styles.activeTab]}
              onPress={() => setActiveTab('all')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'all' && styles.activeTabText
              ]}>
                All {unreadCount > 0 && activeTab === 'all' && `(${unreadCount})`}
              </Text>
            </TouchableOpacity>
          </View>

          {unreadCount > 0 && (
            <TouchableOpacity 
              onPress={handleMarkAllAsRead}
              style={styles.markAllButton}
            >
              <Text style={styles.markAllText}>Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* List */}
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={[
            styles.listContent,
            filteredNotifications.length === 0 && styles.emptyListContent
          ]}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  headerLeft: {
    marginLeft: 16,
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tabsContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  tab: {
    marginRight: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#ffffff',
  },
  markAllButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
  },
  markAllText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
  },
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
    backgroundColor: colors.primary,
  },
  cardContent: {
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
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'transparent',
    gap: 4,
  },
  statusIcon: {
    marginRight: 2,
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
    color: colors.primary,
  },
  time: {
    fontSize: 12,
    color: '#9ca3af',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});