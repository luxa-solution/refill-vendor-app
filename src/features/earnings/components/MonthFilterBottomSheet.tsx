import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MonthFilterBottomSheetProps {
  selectedMonth: string;
  selectedYear: string;
  onSelectMonth: (month: string) => void;
  onSelectYear: (year: string) => void;
  onConfirm: () => void;
}

export type BottomSheetRef = {
  open: () => void;
  close: () => void;
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const years = ["2026", "2025", "2024", "2023", "2022"];

export const MonthFilterBottomSheet = forwardRef<BottomSheetRef, MonthFilterBottomSheetProps>(({
  selectedMonth,
  selectedYear,
  onSelectMonth,
  onSelectYear,
  onConfirm
}, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tempSelectedMonth, setTempSelectedMonth] = useState(selectedMonth);
  const [tempSelectedYear, setTempSelectedYear] = useState(selectedYear);

  const handleOpen = () => {
    setTempSelectedMonth(selectedMonth);
    setTempSelectedYear(selectedYear);
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleConfirm = () => {
    onSelectMonth(tempSelectedMonth);
    onSelectYear(tempSelectedYear);
    onConfirm();
    setIsVisible(false);
  };

  useImperativeHandle(ref, () => ({
    open: () => handleOpen(),
    close: () => handleClose()
  }));

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* Semi-transparent backdrop */}
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={handleClose}
        />
        
        {/* Bottom Sheet Content */}
        <View style={styles.bottomSheet}>
          <SafeAreaView style={styles.contentContainer} edges={['bottom']}>
            {/* Header with selected month-year and close button */}
            <View style={styles.header}>
              <Text style={styles.title}>
                {tempSelectedMonth} - {tempSelectedYear}
              </Text>
              <TouchableOpacity onPress={handleClose}>
                <Ionicons name="close" size={22} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Picker Row  */}
            <View style={styles.pickerRow}>
              {/* Months Column */}
              <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                {months.map((month) => (
                  <TouchableOpacity 
                    key={month} 
                    onPress={() => setTempSelectedMonth(month)}
                  >
                    <Text
                      style={[
                        styles.item,
                        tempSelectedMonth === month && styles.activeItem,
                      ]}
                    >
                      {month}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Years Column */}
              <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                {years.map((year) => (
                  <TouchableOpacity 
                    key={year} 
                    onPress={() => setTempSelectedYear(year)}
                  >
                    <Text
                      style={[
                        styles.item,
                        tempSelectedYear === year && styles.activeItem,
                      ]}
                    >
                      {year}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Confirm Button */}
            <TouchableOpacity 
              style={styles.confirmBtn}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
});

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 280, 
    marginBottom: 24,
    gap: 20,
  },
  scrollContent: {
    paddingVertical: 5,
  },
  item: {
    fontSize: 18,
    color: '#9CA3AF',
    paddingVertical: 12, 
    paddingHorizontal: 8,
  },
  activeItem: {
    color: '#111827',
    fontWeight: '600',
  },
  confirmBtn: {
    backgroundColor: '#FF8A00',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  confirmText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '600',
  },
});