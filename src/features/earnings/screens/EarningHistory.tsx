import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { EarningCard } from '../components/EarningCard';
import EarningsBarChart from '../components/EarningsBarChart';
import EarningsPieChart from '../components/EarningsPieChart';
import { MonthFilterBottomSheet, BottomSheetRef } from '../components/MonthFilterBottomSheet';
import { colors } from '../theme/colors';

// Mock data for history
const MOCK_HISTORY = [
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
  {
    id: '3',
    orderId: '23354334',
    gasSales: 320.00,
    deliveryFee: 42.00,
    total: 18900,
    status: 'completed',
    completedAt: '45 min. ago',
    createdAt: new Date().toISOString(),
  },
];

export default function EarningHistory() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'data' | 'analytics'>('data');
  const [selectedMonth, setSelectedMonth] = useState('February');
  const [selectedYear, setSelectedYear] = useState('2024');
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const handleOpenBottomSheet = () => {
    console.log('Opening month picker');
    bottomSheetRef.current?.open();
  };

  const handleConfirmFilter = () => {
    console.log('Filter confirmed with:', selectedMonth, selectedYear);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.title}>Earning history</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'data' && styles.activeTab]}
          onPress={() => {
            console.log('Switching to DATA tab');
            setActiveTab('data');
          }}
        >
          <Ionicons 
            name="calendar-outline" 
            size={18} 
            color={activeTab === 'data' ? colors.white : colors.textGray} 
          />
          <Text style={activeTab === 'data' ? styles.activeText : styles.inactiveText}>
            Earnings data
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, activeTab === 'analytics' && styles.analyticsActiveTab]}
          onPress={() => {
            console.log('Switching to ANALYTICS tab');
            setActiveTab('analytics');
          }}
        >
          <Ionicons 
            name="stats-chart-outline" 
            size={18} 
            color={activeTab === 'analytics' ? colors.white : colors.textGray} 
          />
          <Text style={activeTab === 'analytics' ? styles.activeText : styles.inactiveText}>
            Earnings Analytics
          </Text>
        </TouchableOpacity>
      </View>

      {/* Summary Row */}
      <View style={styles.summary}>
        <Text style={styles.summaryText}>₦ 500,000  =  50 Orders</Text>
        <TouchableOpacity style={styles.monthSelector} onPress={handleOpenBottomSheet}>
          <Text style={styles.monthText}>{selectedMonth} {selectedYear}</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.orange} />
        </TouchableOpacity>
      </View>

      {/* Content based on active tab */}
      {activeTab === 'data' ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {MOCK_HISTORY.map((item) => (
            <EarningCard key={item.id} item={item} />
          ))}
        </ScrollView>
      ) : (
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={styles.analyticsContainer}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Earnings Overview</Text>
          </View>
          <EarningsBarChart />
          <View style={{ height: 16 }} />
          <EarningsPieChart />
          <View style={{ height: 20 }} />
        </ScrollView>
      )}

      {/* Bottom Sheet */}
      <MonthFilterBottomSheet
        ref={bottomSheetRef}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onSelectMonth={setSelectedMonth}
        onSelectYear={setSelectedYear}
        onConfirm={handleConfirmFilter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.lightGray, 
    padding: 20 
  },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 12, 
    marginBottom: 20,
    paddingTop: 40,
  },
  backButton: {
    padding: 4,
  },
  title: { 
    fontSize: 22, 
    fontWeight: "700",
    color: colors.black,
  },
  tabs: { 
    flexDirection: "row", 
    gap: 12, 
    marginBottom: 16 
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 6,
    backgroundColor: colors.white,
  },
  activeTab: {
    backgroundColor: colors.orange,
  },
  analyticsActiveTab: {
    backgroundColor: colors.orange,
  },
  activeText: { 
    color: colors.white, 
    fontWeight: "600" 
  },
  inactiveText: { 
    color: colors.textGray,
    fontWeight: "500",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
  },
  summaryText: { 
    fontWeight: "600",
    color: colors.black,
    fontSize: 16,
  },
  monthSelector: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 4,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  monthText: { 
    color: colors.orange, 
    fontWeight: "600" 
  },
  analyticsContainer: {
    flex: 1,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 8,
  },
});