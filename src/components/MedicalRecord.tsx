import React from 'react';
import { Calendar, FileText, Stethoscope, ClipboardCheck } from 'lucide-react';

interface MedicalRecord {
  id: number;
  date: string;
  clinicalObservations: string;
  diagnosis: string;
  treatment: string;
  nextCheckup?: string;
  dischargeDate?: string;
  veterinarian: string;
}

interface Props {
  patientId: number;
  onClose: () => void;
}

const MedicalRecord: React.FC<Props> = ({ patientId, onClose }) => {
  const [records] = React.useState<MedicalRecord[]>([
    {
      id: 1,
      date: '2024-03-10',
      clinicalObservations: 'Lethargy, reduced appetite, mild fever (39.5°C)',
      diagnosis: 'Upper respiratory infection',
      treatment: 'Prescribed antibiotics (Amoxicillin 250mg) twice daily for 7 days',
      nextCheckup: '2024-03-17',
      dischargeDate: '2024-03-10',
      veterinarian: 'Dr. Sarah Wilson'
    }
  ]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Medical Records</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <div className="flex justify-end mb-4">
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <FileText className="h-4 w-4 mr-2" />
              New Record
            </button>
          </div>

          <div className="space-y-6">
            {records.map((record) => (
              <div key={record.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {record.date}
                  </div>
                  <span className="text-sm font-medium text-blue-600">
                    {record.veterinarian}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <Stethoscope className="h-4 w-4 mr-2 text-gray-500" />
                      <h4 className="font-medium text-gray-900">Clinical Observations</h4>
                    </div>
                    <p className="text-gray-600 text-sm">{record.clinicalObservations}</p>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <ClipboardCheck className="h-4 w-4 mr-2 text-gray-500" />
                      <h4 className="font-medium text-gray-900">Diagnosis</h4>
                    </div>
                    <p className="text-gray-600 text-sm">{record.diagnosis}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Treatment Plan</h4>
                    <p className="text-gray-600 text-sm">{record.treatment}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <span className="text-sm text-gray-500">Next Checkup</span>
                      <p className="text-sm font-medium text-gray-900">{record.nextCheckup}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Discharge Date</span>
                      <p className="text-sm font-medium text-gray-900">{record.dischargeDate}</p>
                    </div>
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

export default MedicalRecord;