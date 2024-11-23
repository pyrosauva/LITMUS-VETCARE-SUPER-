import React from 'react';
import { format } from 'date-fns';
import { Bill } from '../../lib/types';
import { Download, Plus } from 'lucide-react';

interface BillingHistoryProps {
  bills: Bill[];
}

const BillingHistory: React.FC<BillingHistoryProps> = ({ bills }) => {
  const getStatusColor = (status: Bill['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Billing History</h3>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Bill
        </button>
      </div>

      <div className="space-y-4">
        {bills.map((bill) => (
          <div key={bill.id} className="bg-gray-50 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-medium text-gray-900">
                    ${bill.total.toFixed(2)}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}>
                    {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                  </span>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  Invoice date: {format(new Date(bill.date), 'PP')}
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <Download className="h-5 w-5" />
              </button>
            </div>

            <div className="border-t pt-4">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="pb-2">Item</th>
                    <th className="pb-2">Qty</th>
                    <th className="pb-2">Price</th>
                    <th className="pb-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {bill.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-1">{item.description}</td>
                      <td>{item.quantity}</td>
                      <td>${item.unitPrice.toFixed(2)}</td>
                      <td className="text-right">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="border-t">
                    <td colSpan={3} className="pt-2 text-right font-medium">Subtotal</td>
                    <td className="pt-2 text-right">${bill.subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="text-right font-medium">Tax</td>
                    <td className="text-right">${bill.tax.toFixed(2)}</td>
                  </tr>
                  <tr className="font-semibold">
                    <td colSpan={3} className="text-right">Total</td>
                    <td className="text-right">${bill.total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillingHistory;