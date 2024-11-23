import React, { useState } from 'react';
import { Search, Plus, FileText, Download } from 'lucide-react';
import type { LabResult } from '../../lib/types';
import { format } from 'date-fns';

interface LabResultsProps {
  results: LabResult[];
  onAddTest: () => void;
  onViewResult: (result: LabResult) => void;
}

const LabResults: React.FC<LabResultsProps> = ({
  results,
  onAddTest,
  onViewResult,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredResults = results.filter((result) => {
    const matchesSearch = 
      result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.testType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || result.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: LabResult['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search lab results..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <button
          onClick={onAddTest}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Test Request
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredResults.map((result) => (
          <div
            key={result.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{result.patientName}</h3>
                <p className="text-sm text-gray-500">
                  Test Type: {result.testType.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </p>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Requested By:</span>
                <p className="font-medium text-gray-900">{result.requestedBy}</p>
              </div>
              <div>
                <span className="text-gray-500">Request Date:</span>
                <p className="font-medium text-gray-900">
                  {format(new Date(result.requestDate), 'PP')}
                </p>
              </div>
              {result.completedDate && (
                <>
                  <div>
                    <span className="text-gray-500">Completed Date:</span>
                    <p className="font-medium text-gray-900">
                      {format(new Date(result.completedDate), 'PP')}
                    </p>
                  </div>
                </>
              )}
            </div>

            {result.status === 'completed' && (
              <div className="mt-4 pt-4 border-t flex justify-end space-x-3">
                <button
                  onClick={() => onViewResult(result)}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  <FileText className="h-4 w-4 mr-1.5" />
                  View Results
                </button>
                <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-700">
                  <Download className="h-4 w-4 mr-1.5" />
                  Download PDF
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabResults;