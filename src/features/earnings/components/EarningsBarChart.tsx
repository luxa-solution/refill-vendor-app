import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function EarningsBarChart() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Earnings</Text>
      
      <View style={styles.chartContainer}>
        {/* Y-axis labels */}
        <View style={styles.yAxis}>
          <Text style={styles.axisLabel}>100,000</Text>
          <Text style={styles.axisLabel}>50,000</Text>
          <Text style={styles.axisLabel}>20,000</Text>
          <Text style={styles.axisLabel}>10,000</Text>
          <Text style={styles.axisLabel}>0</Text>
        </View>

        {/* Chart area with grid lines and bars */}
        <View style={styles.chartArea}>
          {/* Horizontal grid lines */}
          <View style={styles.gridLines}>
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />
            <View style={[styles.gridLine, styles.lastGridLine]} />
          </View>

          {/* Bars  */}
          <View style={styles.barsContainer}>
            {/* Bar 1 - 1-2 */}
            <View style={styles.barWrapper}>
              <View style={[styles.bar, { height: 70 }]} />
              <Text style={styles.barLabel}>1-2</Text>
            </View>

            {/* Bar 2 - 1-4 */}
            <View style={styles.barWrapper}>
              <View style={[styles.bar, { height: 90 }]} />
              <Text style={styles.barLabel}>1-4</Text>
            </View>

            {/* Bar 3 - 1-8 */}
            <View style={styles.barWrapper}>
              <View style={[styles.bar, { height: 40 }]} />
              <Text style={styles.barLabel}>1-8</Text>
            </View>

            {/* Bar 4 - 1-9 */}
            <View style={styles.barWrapper}>
              <View style={[styles.bar, { height: 45 }]} />
              <Text style={styles.barLabel}>1-9</Text>
            </View>
          </View>

          {/* Bottom line (x-axis)  */}
          <View style={styles.xAxisLine} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    color: colors.black,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 240,
  },
  yAxis: {
    width: 50,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 8,
    paddingBottom: 25, 
  },
  axisLabel: {
    fontSize: 10,
    color: colors.textGray,
  },
  chartArea: {
    flex: 1,
    position: 'relative',
  },
  gridLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 25, 
    justifyContent: 'space-between',
  },
  gridLine: {
    height: 1,
    backgroundColor: colors.border,
    width: '100%',
  },
  lastGridLine: {
    backgroundColor: colors.border,
  },
  barsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 25, 
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    zIndex: 2,
  },
  barWrapper: {
    alignItems: 'center',
    width: 40,
  },
  bar: {
    width: 24,
    backgroundColor: colors.primary,
    borderRadius: 4,
    marginBottom: 0, 
  },
  barLabel: {
    fontSize: 12,
    color: colors.textGray,
    marginTop: 8, 
    position: 'absolute',
    bottom: -20,
  },
  xAxisLine: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.border,
    zIndex: 1,
  },
});