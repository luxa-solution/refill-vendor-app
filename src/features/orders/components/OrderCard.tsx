import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Order } from '../types';

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <View style={styles.orderCard}>
      {/* Price and View Details */}
      <View style={styles.orderHeader}>
        <Text style={styles.price}>{order.price}</Text>
        <TouchableOpacity style={styles.details}>
          <Text style={styles.detailsText}>View Details</Text>
          <Ionicons name="chevron-down" size={16} color="#1e3a8a" />
        </TouchableOpacity>
      </View>

      <View style={styles.metaRow}>

        <View style={styles.metaItemLeft}>
          <MaterialCommunityIcons name="motorbike" size={18} color="#1e3a8a" />
          <Text style={styles.metaTextSecondary}>{order.distance}</Text>
        </View>

        <View style={styles.metaItemCenter}>
          <Text style={styles.dotStyle}>•</Text>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={18} color="#1e3a8a" />
            <Text style={styles.metaTextSecondary}>{order.time}</Text>
          </View>
          <Text style={styles.dotStyle}>•</Text>
        </View>

        <View style={styles.metaItemRight}>
          <MaterialCommunityIcons name="gas-cylinder" size={18} color="#1e3a8a" />
          <Text style={styles.metaTextSecondary}>{order.weight}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    width: 358,
    alignSelf: 'center',
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    gap: 4,
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  detailsText: {
    color: "#1e3a8a",
    fontWeight: "600",
    fontSize: 14,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: '100%',
  },
  metaItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
    justifyContent: 'flex-start',
  },
  metaItemCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
    justifyContent: 'center',
  },
  metaItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
    justifyContent: 'flex-end',
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaTextSecondary: {
    color: "#1e3a8a",
    fontSize: 15,
    fontWeight: '500',
  },
  dotStyle: {
    fontSize: 16,
    color: "#1e3a8a",
    marginHorizontal: 2,
  },
});

export default OrderCard;