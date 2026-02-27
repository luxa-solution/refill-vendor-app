import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fb923c', 
        tabBarInactiveTintColor: '#6b7280', 
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
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
            <Image 
              source={require('../../assets/images/orders-icon.png')} 
              style={{ 
                width: 24, 
                height: 24,
                tintColor: focused ? '#fb923c' : '#6b7280'
              }} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="earning"
        options={{
          title: 'Earnings',
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../../assets/images/earning-icon.png')} 
              style={{ 
                width: 24, 
                height: 24,
                tintColor: focused ? '#fb923c' : '#6b7280'
              }} 
            />
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
            <Image 
              source={require('../../assets/images/vendor-icon.png')} 
              style={{ 
                width: 24, 
                height: 24,
                tintColor: focused ? '#fb923c' : '#6b7280'
              }} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
