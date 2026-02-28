import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  tabName?: string;
}

const NotificationEmptyState: React.FC<Props> = ({ tabName = '' }) => {
  const getMessage = () => {
    if (tabName === 'recent') {
      return "You don't have any recent notifications";
    }
    return "You don't have any notifications yet";
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="notifications-off-outline" size={48} color="#9ca3af" />
      </View>
      <Text style={styles.title}>No notifications {tabName && `(${tabName})`}</Text>
      <Text style={styles.message}>{getMessage()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default NotificationEmptyState;