import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { format, subMonths } from 'date-fns';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import type { InventoryItem } from '../../lib/types';

interface InventoryAnalyticsProps {
  items: InventoryItem[];
}

const InventoryAnalytics: React.FC<InventoryAnalyticsProps> = ({ items }) => {
  const monthlyUsage = {
    labels: Array.from({ length: 6 }, (_, i) => 
      format(subMonths(new Date(), 5 - i), 'MMM yyyy')
    ),
    datasets: [{
      label: 'Monthly Usage',
      data: [320, 350, 380, 340, 360, 390],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }]
  };

  const topItems = {
    labels: ['Vaccine A', 'Medicine B', 'Supply C', 'Equipment D', 'Medicine E'],
    datasets: [{
      label: 'Most Used Items',
      data: [150, 120, 100, 80, 60],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
    }]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Total Value</h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="mt-2 text-3xl font-semibold">$45,280</p>
          <p className="text-sm text-gray-500">+5.2% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Low Stock Items</h3>
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="mt-2 text-3xl font-semibold">8</p>
          <p className="text-sm text-gray-500">Items below minimum level</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Expiring Soon</h3>
            <TrendingDown className="h-5 w-5 text-red-500" />
          </div>
          <p className="mt-2 text-3xl font-semibold">12</p>
          <p className="text-sm text-gray-500">Items expiring in 30 days</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Usage Trend</h3>
          <Line 
            data={monthlyUsage}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                y: { beginAtZero: true }
              }
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top 5 Most Used Items</h3>
          <Bar 
            data={topItems}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                y: { beginAtZero: true }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryAnalytics;