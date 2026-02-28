import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Order } from '../types/order.types';
import { colors } from '../../../theme/colors';

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const formatAmount = (amount?: number) => {
    if (amount) return `₦${amount.toLocaleString()}`;
    if ('price' in order) return order.price;
    return '₦0';
  };

  const getDistance = () => {
    if ('distance' in order) return order.distance;
    return '1.3km';
  };

  const getTime = () => {
    if ('time' in order) return order.time;
    if (order.createdAt) {
      return '5 min ago';
    }
    return 'Just now';
  };

  const getWeight = () => {
    if ('weight' in order) return order.weight;
    if (order.items && order.items.length > 0) {
      return `${order.items[0].quantity * 12}kg`; 
    }
    return '12kg';
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.amount}>{formatAmount(order.totalAmount)}</Text>
        <TouchableOpacity style={styles.details}>
          <Text style={styles.detailsText}>View Details</Text>
          <Ionicons name="chevron-down" size={18} color={colors.blue} />
        </TouchableOpacity>
      </View>

      <View style={styles.meta}>
        <View style={styles.metaItem}>
          <MaterialCommunityIcons name="motorbike" size={16} color={colors.blue} />
          <Text style={styles.metaText}>{getDistance()}</Text>
        </View>
        
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={16} color={colors.blue} />
          <Text style={styles.metaText}>{getTime()}</Text>
        </View>
        
        <View style={styles.metaItem}>
          <MaterialCommunityIcons name="gas-cylinder" size={16} color={colors.blue} />
          <Text style={styles.metaText}>{getWeight()}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primaryLight,
    borderRadius: 18,
    marginBottom: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.textDark,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailsText: {
    color: colors.blue,
    fontWeight: '600',
    fontSize: 14,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: colors.textGray,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default OrderCard;