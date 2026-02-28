import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../../theme/colors';

interface EmptyStateProps {
  tabName: string;
}

const EmptyState = ({ tabName }: EmptyStateProps) => {
  const getEmptyContent = () => {
    switch(tabName) {
      case "New":
        return {
          title: "No new orders right now",
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
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/images/Group.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: colors.white,
    borderRadius: 18,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    color: colors.textGray,
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 14,
    paddingHorizontal: 16,
  },
});

export default EmptyState;