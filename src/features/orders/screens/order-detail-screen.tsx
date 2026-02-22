import { StyleSheet, Text, View } from 'react-native';

export default function OrderDetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Order Detail</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  text: { fontSize: 18, color: '#1A1A1A' },
});
