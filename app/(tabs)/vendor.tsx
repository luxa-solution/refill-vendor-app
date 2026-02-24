import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function VendorScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vendor Screen</Text>
      <Text style={styles.subtext}>Coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#374151',
  },
  subtext: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
  },
});
