import React from 'react';
import { FileText, Download, Filter } from 'lucide-react';
import type { Report } from '../../lib/types';
import { format } from 'date-fns';

interface ReportGeneratorProps {
  onGenerate: (config: ReportConfig) => void;
  reports: Report[];
}

interface ReportConfig {
  type: Report['type'];
  period: {
    start: string;
    end: string;
  };
  format: Report['format'];
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({
  onGenerate,
  reports,
}) => {
  const [config, setConfig] = React.useState<ReportConfig>({
    type: 'financial',
    period: {
      start: format(new Date(), 'yyyy-MM-01'),
      end: format(new Date(), 'yyyy-MM-dd'),
    },
    format: 'pdf',
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Generate Report</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Report Type</label>
            <select
              value={config.type}
              onChange={(e) => setConfig({ ...config, type: e.target.value as Report['type'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="financial">Financial Report</option>
              <option value="clinical">Clinical Statistics</option>
              <option value="inventory">Inventory Status</option>
              <option value="staff">Staff Performance</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={config.period.start}
                onChange={(e) => setConfig({
                  ...config,
                  period: { ...config.period, start: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={config.period.end}
                onChange={(e) => setConfig({
                  ...config,
                  period: { ...config.period, end: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Format</label>
            <select
              value={config.format}
              onChange={(e) => setConfig({ ...config, format: e.target.value as Report['format'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="pdf">PDF</option>
              <option value="csv">CSV</option>
              <option value="excel">Excel</option>
            </select>
          </div>

          <button
            onClick={() => onGenerate(config)}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FileText className="h-5 w-5 mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Recent Reports</h3>
        </div>
        <div className="divide-y">
          {reports.map((report) => (
            <div key={report.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{report.title}</h4>
                  <p className="text-sm text-gray-500">
                    Generated on {format(new Date(report.date), 'PP')}
                  </p>
                </div>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Download className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {report.type}
                </span>
                <span className="text-sm text-gray-500">
                  {format(new Date(report.period.start), 'PP')} - {format(new Date(report.period.end), 'PP')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;