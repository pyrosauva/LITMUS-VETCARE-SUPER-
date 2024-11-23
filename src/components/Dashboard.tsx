import React from 'react';
import { Calendar, Users, PawPrint, DollarSign } from 'lucide-react';

const stats = [
  { name: 'Appointments Today', value: '12', icon: Calendar, color: 'bg-blue-500' },
  { name: 'Active Patients', value: '148', icon: PawPrint, color: 'bg-green-500' },
  { name: 'Staff Members', value: '8', icon: Users, color: 'bg-purple-500' },
  { name: 'Revenue (Month)', value: '$24,500', icon: DollarSign, color: 'bg-yellow-500' },
];

const recentAppointments = [
  { pet: 'Max', owner: 'John Doe', time: '09:00 AM', type: 'Vaccination' },
  { pet: 'Luna', owner: 'Jane Smith', time: '10:30 AM', type: 'Check-up' },
  { pet: 'Charlie', owner: 'Mike Johnson', time: '11:45 AM', type: 'Surgery' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">Today's Appointments</h2>
          <div className="mt-4 divide-y">
            {recentAppointments.map((appointment, index) => (
              <div key={index} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{appointment.pet}</p>
                  <p className="text-sm text-gray-500">{appointment.owner}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                  <p className="text-sm text-gray-500">{appointment.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;