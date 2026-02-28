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
import { router } from 'expo-router';
import OrderCard from "../components/OrderCard";
import EmptyState from "../components/EmptyState";
import OrderTabs from "../components/OrderTabs";
import { Order } from "../types/order.types";
import { useNotifications } from "../../../features/notifications/hooks/useNotifications";
import { colors } from "../../../theme/colors";
import { SafeAreaView } from 'react-native-safe-area-context';

const OrdersScreen = () => {
  const [available, setAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState("New");
  const [showEarnings, setShowEarnings] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]); 
  const { unreadCount } = useNotifications();

  // Demo functions - remove in production
  const addDemoOrder = () => {
    const newOrder: Order = {
      id: Date.now().toString(),
      orderNumber: `ORD-${Date.now()}`,
      customerId: "cust123",
      customerName: "John Doe",
      customerPhone: "08012345678",
      customerAddress: "123 Main Street",
      items: [
        {
          productId: "prod1",
          name: "12kg Gas",
          quantity: 1,
          unitPrice: 8000
        }
      ],
      totalAmount: 8000,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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

  const getOrdersForTab = () => {
    switch(activeTab) {
      case "New":
        return orders.filter(o => o.status === "pending");
      case "Accepted":
        return orders.filter(o => o.status === "confirmed" || o.status === "assigned");
      case "Delivering":
        return orders.filter(o => o.status === "in_transit");
      case "Completed":
        return orders.filter(o => o.status === "delivered");
      default:
        return [];
    }
  };

  const filteredOrders = getOrdersForTab();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Orders</Text>
            <Text style={styles.subtitle}>Ibrahim Gas Vendor</Text>
          </View>
          <TouchableOpacity
            style={styles.bell}
            onPress={() => router.push('/(tabs)/notifications')}
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={22} color={colors.textDark} />
            {unreadCount > 0 && (
              <View style={styles.dot}>
                {unreadCount > 9 && (
                  <Text style={styles.dotText}>
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Text>
                )}
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Availability */}
        <View style={styles.availability}>
          <Text style={styles.availabilityText}>Vendor Availability</Text>
          <Switch
            value={available}
            onValueChange={setAvailable}
            trackColor={{ false: colors.gray300, true: colors.success }}
            thumbColor={colors.white}
          />
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Orders completed</Text>
            <Text style={styles.statValue}>50</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.earningsRow}>
              <Text style={styles.statLabel}>Today’s Earnings</Text>
              <TouchableOpacity onPress={() => setShowEarnings(!showEarnings)}>
                <Ionicons
                  name={showEarnings ? "eye-off-outline" : "eye-outline"}
                  size={18}
                  color={colors.textGray}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.statValue}>
              {showEarnings ? "₦ 500,000" : "******"}
            </Text>
          </View>
        </View>

        {/* Debug buttons */}
        <View style={styles.debugButtons}>
          <TouchableOpacity
            onPress={addDemoOrder}
            style={styles.debugAdd}
          >
            <Text style={styles.debugAddText}>➕ Add Demo Order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={clearOrders}
            style={styles.debugClear}
          >
            <Text style={styles.debugClearText}>🗑️ Clear Orders</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.graySection}>
        {/* Tabs Component */}
        <OrderTabs 
          active={activeTab} 
          onChange={setActiveTab} 
          newCount={orders.filter(o => o.status === "pending").length}
        />

        {/* Content - Empty state or orders */}
        <ScrollView 
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
        >
          {filteredOrders.length === 0 ? (
            <EmptyState tabName={activeTab} />
          ) : (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.muted, 
  },
  headerSection: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textDark,
  },
  subtitle: {
    color: colors.textGray,
    marginTop: 4,
    fontSize: 16,
  },
  bell: {
    backgroundColor: colors.white,
    borderRadius: 30,
    padding: 10,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  dot: {
    minWidth: 16,
    height: 16,
    backgroundColor: colors.red,
    borderRadius: 8,
    position: "absolute",
    top: 5,
    right: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  dotText: {
    color: colors.white,
    fontSize: 8,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 14,
  },
  availability: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  availabilityText: {
    fontSize: 16,
    color: colors.textGray,
    fontWeight: '500',
  },
  stats: {
    flexDirection: 'row',
    margin: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    backgroundColor: colors.white,
  },
  statLabel: {
    color: colors.textGray,
    fontSize: 14,
  },
  statValue: {
    fontSize: 26,
    fontWeight: '700',
    marginTop: 10,
    color: colors.textDark,
  },
  earningsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  debugButtons: {
    flexDirection: 'row',
    gap: 16,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  debugAdd: {
    backgroundColor: colors.success,
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  debugAddText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  debugClear: {
    backgroundColor: colors.red,
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  debugClearText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  graySection: {
    flex: 1,
    backgroundColor: colors.muted,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 30,
  },
});

export default OrdersScreen;

