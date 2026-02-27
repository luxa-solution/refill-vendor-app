export interface EarningItem {
  id: string;
  orderId: string;
  gasSales: number;
  deliveryFee: number;
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
  completedAt: string;
  createdAt: string;
}

export interface EarningsSummary {
  todayEarnings: number;
  todayOrders: number;
  weeklyEarnings: number;
  monthlyEarnings: number;
}

export interface EarningsFilter {
  month: string;
  year: number;
}