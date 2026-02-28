import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EarningCardProps {
  item: {
    id: string;
    orderId: string;
    gasSales: number;
    deliveryFee: number;
    total: number;
    status: string;
    completedAt: string;
  };
}

export const EarningCard: React.FC<EarningCardProps> = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.rowBetween}>
      <Text style={styles.label}>Gas Sales</Text>
      <Text style={styles.amount}>₦{item.gasSales.toFixed(2)}</Text>
    </View>

    <View style={styles.rowBetween}>
      <Text style={styles.label}>Delivery fees</Text>
      <Text style={styles.amount}>₦{item.deliveryFee.toFixed(2)}</Text>
    </View>

    <View style={styles.divider} />

    <View style={styles.rowBetween}>
      <Text style={styles.totalLabel}>Total</Text>
      <Text style={styles.totalAmount}>₦{item.total.toLocaleString()}</Text>
    </View>

    <View style={styles.divider} />

    <View style={styles.footer}>
      <Text style={styles.orderId}>#{item.orderId}</Text>
      <View style={styles.footerRight}>
        <Text style={styles.completed}>Completed {item.completedAt}</Text>
        <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ECECEC",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    color: "#6B7280",
  },
  amount: {
    color: "#0F172A",
  },
  totalLabel: {
    fontWeight: "600",
  },
  totalAmount: {
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#D1D5DB",
    marginVertical: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    alignItems: "center",
  },
  orderId: {
    color: "#6B7280",
  },
  footerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  completed: {
    color: "#6B7280",
    fontSize: 12,
  },
});