import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { format } from 'date-fns';
import type { VitalSigns } from '../../lib/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface VitalSignsChartProps {
  vitalSigns: VitalSigns[];
}

const VitalSignsChart: React.FC<VitalSignsChartProps> = ({ vitalSigns }) => {
  const sortedVitalSigns = [...vitalSigns].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const labels = sortedVitalSigns.map(record => 
    format(new Date(record.date), 'MMM d')
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: sortedVitalSigns.map(record => record.temperature),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Heart Rate (bpm)',
        data: sortedVitalSigns.map(record => record.heartRate),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Respiratory Rate (rpm)',
        data: sortedVitalSigns.map(record => record.respiratoryRate),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Vital Signs Trend',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <Line options={options} data={data} />
    </div>
  );
};

export default VitalSignsChart;