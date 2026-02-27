import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { G, Path, Circle } from 'react-native-svg';
import { colors } from '../theme/colors';

// Mock data structure
interface PieData {
  value: number;
  color: string;
  label: string;
  amount: string;
  percentage: number;
}

const mockPieData: PieData[] = [
  { value: 90, color: colors.orange, label: 'LPG Gas', amount: '₦3,000,000', percentage: 90 },
  { value: 9, color: colors.primary, label: 'Others', amount: '₦300,000', percentage: 9 },
  { value: 1, color: '#9CA3AF', label: 'Delivery', amount: '₦3,000', percentage: 1 },
];

// Function to create SVG path for pie segments
const createPieSegment = (startAngle: number, endAngle: number, radius: number) => {
  const start = {
    x: radius + radius * Math.cos(startAngle),
    y: radius + radius * Math.sin(startAngle)
  };
  const end = {
    x: radius + radius * Math.cos(endAngle),
    y: radius + radius * Math.sin(endAngle)
  };
  
  const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
  
  return `M${radius},${radius} L${start.x},${start.y} A${radius},${radius} 0 ${largeArcFlag},1 ${end.x},${end.y} Z`;
};

export default function EarningsPieChart() {
  const radius = 90;
  const center = radius;
  
  // Calculate angles
  const total = mockPieData.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  
  const segments = mockPieData.map((item) => {
    const angle = (item.value / total) * (2 * Math.PI);
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;
    
    return {
      ...item,
      path: createPieSegment(startAngle, endAngle, radius),
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Earnings source</Text>

      {/* Pie Chart */}
      <View style={styles.chartContainer}>
        <Svg width={200} height={200} viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
          {/* Background circle */}
          <Circle
            cx={radius}
            cy={radius}
            r={radius}
            fill="#E5E7EB"
          />
          
          {/* Pie segments */}
          {segments.map((segment, index) => (
            <Path
              key={index}
              d={segment.path}
              fill={segment.color}
              stroke="white"
              strokeWidth="1"
            />
          ))}
          
          {/* Inner white circle for donut effect */}
          <Circle
            cx={radius}
            cy={radius}
            r={radius * 0.6}
            fill="white"
          />
        </Svg>
      </View>

      {/* Simple Legend UNDER the circle - your second developer can enhance this */}
      <View style={styles.legendContainer}>
        {mockPieData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.colorDot, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>
              {item.label}: {item.amount} ({item.percentage}%)
            </Text>
          </View>
        ))}
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
    marginBottom: 16,
    color: colors.black,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  legendContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
    color: colors.textGray,
    flex: 1,
  },
});