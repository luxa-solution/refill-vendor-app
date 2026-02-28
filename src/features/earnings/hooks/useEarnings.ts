import { useState, useEffect } from 'react';
import { EarningsSummary, EarningItem } from '../types';

// Mock data since backend isn't ready
const MOCK_EARNINGS_SUMMARY: EarningsSummary = {
  todayEarnings: 500000,
  todayOrders: 50,
  weeklyEarnings: 3500000,
  monthlyEarnings: 15000000,
};

const MOCK_EARNING_ITEMS: EarningItem[] = [
  {
    id: '1',
    orderId: '23354332',
    gasSales: 549.00,
    deliveryFee: 54.00,
    total: 35000,
    status: 'completed',
    completedAt: '10 min. ago',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    orderId: '23354333',
    gasSales: 780.00,
    deliveryFee: 65.00,
    total: 42500,
    status: 'completed',
    completedAt: '25 min. ago',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    orderId: '23354334',
    gasSales: 320.00,
    deliveryFee: 42.00,
    total: 18900,
    status: 'completed',
    completedAt: '45 min. ago',
    createdAt: new Date().toISOString(),
  },
];

export const useEarnings = () => {
  const [summary, setSummary] = useState<EarningsSummary | null>(null);
  const [recentEarnings, setRecentEarnings] = useState<EarningItem[]>([]);
  const [history, setHistory] = useState<EarningItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('February');

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSummary(MOCK_EARNINGS_SUMMARY);
        setRecentEarnings(MOCK_EARNING_ITEMS);
        setHistory([...MOCK_EARNING_ITEMS, ...MOCK_EARNING_ITEMS]); 
      } catch (error) {
        console.error('Error fetching earnings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterByMonth = (month: string) => {
    setSelectedMonth(month);
    // In real app, you'd filter data here
    console.log(`Filtering by month: ${month}`);
  };

  return {
    summary,
    recentEarnings,
    history,
    loading,
    selectedMonth,
    filterByMonth,
  };
};