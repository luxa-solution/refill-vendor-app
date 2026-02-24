import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface EmptyStateProps {
  tabName: string;
}

 const EmptyState = ({ tabName }: EmptyStateProps) => {
  const getEmptyContent = () => {
    switch(tabName) {
      case "New":
        return {
          title: "No new order right now",
          message: "Keep your gas vendor available. New orders will show up here as soon as customers place them."
        };
      case "Accepted":
        return {
          title: "No accepted orders",
          message: "Orders you accept will appear here until they're out for delivery."
        };
      case "Delivering":
        return {
          title: "No active deliveries",
          message: "Accepted orders that are being delivered will appear here."
        };
      case "Completed":
        return {
          title: "No completed orders yet",
          message: "Finished deliveries will be saved here for your records and earnings."
        };
      default:
        return {
          title: "No orders",
          message: "Orders will appear here."
        };
    }
  };

  const { title, message } = getEmptyContent();

  return (
    <View style={styles.empty}>
      <Image 
        source={require('../../../../assets/images/Group.png')} 
        style={{ width: 100, height: 100, marginBottom: 12 }}
        resizeMode="contain"
      />
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    width: 358,
    alignSelf: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: 'center',
    color: "#1f2937",
  },
  emptyText: {
    textAlign: "center",
    color: "#6b7280",
    paddingHorizontal: 16,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default EmptyState;