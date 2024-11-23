import React from 'react';
import { Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import type { LabResult } from '../../lib/types';

interface LabDashboardProps {
  results: LabResult[];
}

const LabDashboard: React.FC<LabDashboardProps> = ({ results }) => {
  const stats = {
    pending: results.filter(r => r.status === 'pending').length,
    inProgress: results.filter(r => r.status === 'in-progress').length,
    completed: results.filter(r => r.status === 'completed').length,
    critical: results.filter(r => r.results.some(test => test.flag === 'critical')).length,
  };

  const recentResults = results
    .filter(r => r.status === 'completed')
    .sort((a, b) => new Date(b.completedDate!).getTime() - new Date(a.completedDate!).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Clock className="h-10 w-10 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <AlertCircle className="h-10 w-10 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.inProgress}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <CheckCircle className="h-10 w-10 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <XCircle className="h-10 w-10 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Critical Results</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.critical}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900">Recent Results</h3>
          <div className="mt-6 divide-y">
            {recentResults.map((result) => (
              <div key={result.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{result.patientName}</p>
                    <p className="text-sm text-gray-500">{result.testType}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(result.completedDate!).toLocaleDateString()}
                    </p>
                    {result.results.some(test => test.flag === 'critical') && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Critical
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabDashboard;