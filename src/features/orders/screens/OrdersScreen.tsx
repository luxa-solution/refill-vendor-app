import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {OrderCard} from "../components/OrderCard";
  import {EmptyState} from "../components/EmptyState";
import { Order } from "../types";

export const OrdersScreen = () => {
  const [available, setAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState("New");
  const [showEarnings, setShowEarnings] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]); // Start empty

  // Demo functions - remove in production
  const addDemoOrder = () => {
    const newOrder: Order = {
      id: Date.now(),
      price: "₦8,000",
      distance: "1.3km",
      time: "Just now",
      weight: "12kg",
    };
    setOrders([...orders, newOrder]);
  };

  const clearOrders = () => {
    setOrders([]);
  };

  const tabs = ["New", "Accepted", "Delivering", "Completed"];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Orders</Text>
            <Text style={styles.subtitle}>Ibrahim Gas Vendor</Text>
          </View>
          <View style={styles.bell}>
            <Ionicons name="notifications-outline" size={22} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Availability */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Vendor Availability</Text>
          <Switch
            value={available}
            onValueChange={setAvailable}
            trackColor={{ false: "#ccc", true: "#22c55e" }}
          />
        </View>

        {/* Stats */}
        <View style={styles.statsCard}>
          <View>
            <Text style={styles.statLabel}>Orders completed</Text>
            <Text style={styles.statValue}>50</Text>
          </View>
          <View>
            <View style={styles.earnRow}>
              <Text style={styles.statLabel}>Today’s Earnings</Text>
              <TouchableOpacity onPress={() => setShowEarnings(!showEarnings)}>
                <Ionicons 
                  name={showEarnings ? "eye-off-outline" : "eye-outline"} 
                  size={18} 
                  color="#6b7280"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.statValue}>
              {showEarnings ? "₦ 500,000" : "******"}
            </Text>
          </View>
        </View>

        {/* Debug buttons - remove in production */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
          <TouchableOpacity 
            onPress={addDemoOrder}
            style={{ backgroundColor: '#22c55e', padding: 8, borderRadius: 8 }}
          >
            <Text style={{ color: 'white' }}>➕ Add Demo Order</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={clearOrders}
            style={{ backgroundColor: '#ef4444', padding: 8, borderRadius: 8 }}
          >
            <Text style={{ color: 'white' }}>🗑️ Clear Orders</Text>
          </TouchableOpacity>
        </View>

        {/* Main content container */}
        <View style={styles.content}>
          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <View style={styles.tabs}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[
                    styles.tab,
                    activeTab === tab && styles.activeTab,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === tab && styles.activeTabText,
                    ]}
                  >
                    {tab === "New" && orders.length > 0 
                      ? `New (${orders.length})` 
                      : tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Content - Empty state or orders */}
          <View style={styles.contentInner}>
            {orders.length === 0 ? (
              <EmptyState tabName={activeTab} />
            ) : (
              orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 4,
  },
  bell: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f5e9df",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: "red",
    borderRadius: 4,
    position: "absolute",
    top: 10,
    right: 10,
  },
  card: {
    backgroundColor: "#e5e7eb",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 18,
    color: "#374151",
  },
  statsCard: {
    backgroundColor: "#e5e7eb",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  statLabel: {
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 26,
    fontWeight: "700",
  },
  earnRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    backgroundColor: "#e5e7eb",
    borderRadius: 20,
    padding: 12,
    width: 382,
    minHeight: 267,
    alignSelf: 'center',
  },
  tabsContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  tabs: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: 'center',
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#fb923c",
  },
  tabText: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "600",
  },
  contentInner: {
    minHeight: 200,
  },
});

