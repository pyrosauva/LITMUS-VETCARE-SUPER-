import React from 'react';
import { format } from 'date-fns';
import { MedicalRecord } from '../../lib/types';
import { FileText, Plus } from 'lucide-react';

interface MedicalHistoryProps {
  records: MedicalRecord[];
}

const MedicalHistory: React.FC<MedicalHistoryProps> = ({ records }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Medical History</h3>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Record
        </button>
      </div>

      <div className="space-y-6">
        {records.map((record) => (
          <div key={record.id} className="bg-gray-50 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm text-gray-500">
                  {format(new Date(record.date), 'PPP')}
                </div>
                <div className="mt-1 text-lg font-medium text-gray-900">
                  {record.diagnosis}
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700">
                <FileText className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Symptoms</h4>
                <div className="mt-1 flex flex-wrap gap-2">
                  {record.symptoms.map((symptom, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900">Treatment</h4>
                <p className="mt-1 text-sm text-gray-600">{record.treatment}</p>
              </div>

              {record.prescriptions.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Prescriptions</h4>
                  <div className="mt-2 space-y-2">
                    {record.prescriptions.map((prescription) => (
                      <div
                        key={prescription.id}
                        className="text-sm text-gray-600 flex justify-between items-center"
                      >
                        <span>{prescription.medication}</span>
                        <span className="text-gray-500">
                          {prescription.dosage} • {prescription.frequency} • {prescription.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {record.notes && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Notes</h4>
                  <p className="mt-1 text-sm text-gray-600">{record.notes}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalHistory;