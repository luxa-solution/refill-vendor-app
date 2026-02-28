import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { EarningCard } from '../components/EarningCard';

// Mock data
const MOCK_SUMMARY = {
  todayEarnings: 500000,
  todayOrders: 50,
};

const MOCK_RECENT_EARNINGS = [
  {
    id: '1',
    orderId: '23354332',
    gasSales: 549.00,
    deliveryFee: 54.00,
    total: 35000,
    status: 'completed',
    completedAt: '10 min. ago',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    orderId: '23354333',
    gasSales: 780.00,
    deliveryFee: 65.00,
    total: 42500,
    status: 'completed',
    completedAt: '25 min. ago',
    createdAt: new Date().toISOString(),
  },
];

export default function EarningsScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Added spacer at the very top */}
      <View style={styles.topSpacer} />
      
      <Text style={styles.title}>Earnings</Text>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Today's Earnings</Text>
          <Text style={styles.statValue}>₦{MOCK_SUMMARY.todayEarnings.toLocaleString()}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Today Orders</Text>
          <Text style={styles.statValue}>{MOCK_SUMMARY.todayOrders}</Text>
        </View>
      </View>

      {/* Full History Button */}
      <TouchableOpacity
        style={styles.historyBtn}
        onPress={() => router.push('/earning/history')}
      >
        <Text style={styles.historyText}>Full earning history</Text>
        <Ionicons name="chevron-forward" size={20} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Recent earnings</Text>

      {/* Cards */}
      {MOCK_RECENT_EARNINGS.map((item) => (
        <EarningCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    padding: 20,
  },
  topSpacer: {
    height: 40, // This pushes everything down
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#ECECEC",
    borderRadius: 16,
    padding: 16,
  },
  statLabel: {
    color: "#6B7280",
    marginBottom: 6,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
  },
  historyBtn: {
    marginTop: 20,
    backgroundColor: "#FF8A00",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  historyText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },
});