import { Tabs } from 'expo-router';
import { Image, View, StyleSheet } from 'react-native';
import { colors } from '../../src/theme/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary, 
        tabBarInactiveTintColor: colors.textGray, 
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null, 
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Image 
                source={require('../../assets/images/package_2.png')} 
                style={[
                  styles.icon,
                  { tintColor: focused ? colors.white : colors.textGray }
                ]} 
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="earning"
        options={{
          title: 'Earnings',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Image 
                source={require('../../assets/images/earning-icon.png')} 
                style={[
                  styles.icon,
                  { tintColor: focused ? colors.white : colors.textGray }
                ]} 
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="earning/history"
        options={{
          href: null, 
        }}
      />

      <Tabs.Screen
        name="vendor"
        options={{
          title: 'My Vendor',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Image 
                source={require('../../assets/images/vendor-icon.png')} 
                style={[
                  styles.icon,
                  { tintColor: focused ? colors.white : colors.textGray }
                ]} 
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 40, 
    height: 40, 
    borderRadius: 12, 
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  activeIconContainer: {
    backgroundColor: colors.primary, 
    borderRadius: 12, 
  },
  icon: {
    width: 22, 
    height: 22, 
  },
});