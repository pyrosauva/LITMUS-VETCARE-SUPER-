import React from 'react';
import { FileText, Download, Share2, Printer } from 'lucide-react';
import type { MedicalRecord, VitalSigns, Prescription } from '../../lib/types';
import { format } from 'date-fns';

interface EHRViewerProps {
  records: MedicalRecord[];
  vitalSigns: VitalSigns[];
  prescriptions: Prescription[];
}

const EHRViewer: React.FC<EHRViewerProps> = ({
  records,
  vitalSigns,
  prescriptions,
}) => {
  const [selectedRecord, setSelectedRecord] = React.useState<MedicalRecord | null>(null);

  const sortedRecords = [...records].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Electronic Health Records</h2>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
              <Download className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
              <Printer className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 min-h-[600px]">
        <div className="col-span-4 border-r">
          <div className="p-4">
            <input
              type="text"
              placeholder="Search records..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="divide-y overflow-y-auto max-h-[500px]">
            {sortedRecords.map((record) => (
              <button
                key={record.id}
                onClick={() => setSelectedRecord(record)}
                className={`w-full p-4 text-left hover:bg-gray-50 ${
                  selectedRecord?.id === record.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-gray-400 mt-1" />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">
                      {format(new Date(record.date), 'MMM d, yyyy')}
                    </p>
                    <p className="text-sm text-gray-500">{record.diagnosis}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-8 p-6">
          {selectedRecord ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Visit on {format(new Date(selectedRecord.date), 'MMMM d, yyyy')}
                </h3>
                <p className="text-sm text-gray-500">Dr. {selectedRecord.veterinarian}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Symptoms</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRecord.symptoms.map((symptom, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-0.5 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Diagnosis</h4>
                <p className="text-gray-700">{selectedRecord.diagnosis}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Treatment Plan</h4>
                <p className="text-gray-700">{selectedRecord.treatment}</p>
              </div>

              {selectedRecord.prescriptions.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Prescriptions</h4>
                  <div className="space-y-2">
                    {selectedRecord.prescriptions.map((prescription) => (
                      <div
                        key={prescription.id}
                        className="p-3 bg-gray-50 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{prescription.medication}</p>
                          <p className="text-sm text-gray-500">
                            {prescription.dosage} • {prescription.frequency} • {prescription.duration}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">
                          Refills: {prescription.refills}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedRecord.notes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Additional Notes</h4>
                  <p className="text-gray-700">{selectedRecord.notes}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a record to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EHRViewer;