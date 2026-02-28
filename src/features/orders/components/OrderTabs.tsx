import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

interface OrderTabsProps {
  active: string;
  onChange: (tab: string) => void;
  newCount?: number;
}

const tabs = ['New', 'Accepted', 'Delivering', 'Completed'];

const OrderTabs: React.FC<OrderTabsProps> = ({ active, onChange, newCount = 0 }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity 
          key={tab} 
          onPress={() => onChange(tab)}
          style={styles.tabButton}
        >
          <Text
            style={[
              styles.tab,
              active === tab && styles.activeTab,
            ]}
          >
            {tab}
            {tab === 'New' && newCount > 0 && (
              <Text style={styles.badge}> {newCount}</Text>
            )}
          </Text>
          {active === tab && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  tabButton: {
    alignItems: 'center',
  },
  tab: {
    color: colors.textGray,
    fontSize: 16,
    fontWeight: '500',
  },
  activeTab: {
    color: colors.primary,
    fontWeight: '600',
  },
  activeIndicator: {
    marginTop: 8,
    height: 2,
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  badge: {
    backgroundColor: colors.primaryLight,
    color: colors.primary,
    paddingHorizontal: 6,
    borderRadius: 10,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default OrderTabs;