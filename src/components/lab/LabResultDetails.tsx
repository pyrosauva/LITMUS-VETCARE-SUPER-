import React from 'react';
import { format } from 'date-fns';
import type { LabResult } from '../../lib/types';
import { FileText, Download, X } from 'lucide-react';

interface LabResultDetailsProps {
  result: LabResult;
  onClose: () => void;
}

const LabResultDetails: React.FC<LabResultDetailsProps> = ({
  result,
  onClose,
}) => {
  const getFlagColor = (flag?: 'normal' | 'low' | 'high' | 'critical') => {
    switch (flag) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'low':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{result.patientName}</h2>
            <p className="text-sm text-gray-500">
              Test Type: {result.testType.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <span className="text-gray-500">Requested By:</span>
              <p className="font-medium text-gray-900">{result.requestedBy}</p>
            </div>
            <div>
              <span className="text-gray-500">Request Date:</span>
              <p className="font-medium text-gray-900">
                {format(new Date(result.requestDate), 'PPP')}
              </p>
            </div>
            {result.completedDate && (
              <>
                <div>
                  <span className="text-gray-500">Completed Date:</span>
                  <p className="font-medium text-gray-900">
                    {format(new Date(result.completedDate), 'PPP')}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Test Results</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-4 py-2">Parameter</th>
                    <th className="px-4 py-2">Result</th>
                    <th className="px-4 py-2">Unit</th>
                    <th className="px-4 py-2">Reference Range</th>
                    <th className="px-4 py-2">Flag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {result.results.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900">
                        {item.parameter}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {item.value}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        {item.unit}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        {item.referenceRange}
                      </td>
                      <td className="px-4 py-2">
                        {item.flag && (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getFlagColor(item.flag)}`}>
                            {item.flag.charAt(0).toUpperCase() + item.flag.slice(1)}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {result.notes && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
              <p className="text-sm text-gray-600">{result.notes}</p>
            </div>
          )}

          {result.attachments && result.attachments.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Attachments</h4>
              <div className="space-y-2">
                {result.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{attachment}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Close
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabResultDetails;