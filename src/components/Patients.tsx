import React, { useState } from 'react';
import { Search, Plus, PawPrint } from 'lucide-react';
import MedicalRecord from './MedicalRecord';

interface Patient {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  owner: string;
  lastVisit: string;
}

const initialPatients: Patient[] = [
  {
    id: 1,
    name: 'Max',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 5,
    owner: 'John Doe',
    lastVisit: '2024-03-10',
  },
  {
    id: 2,
    name: 'Luna',
    species: 'Cat',
    breed: 'Persian',
    age: 3,
    owner: 'Jane Smith',
    lastVisit: '2024-03-12',
  },
];

const Patients = () => {
  const [patients] = useState<Patient[]>(initialPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <Plus className="h-5 w-5 mr-2" />
          Add Patient
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((patient) => (
          <div key={patient.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <PawPrint className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
                <p className="text-sm text-gray-500">{patient.species} - {patient.breed}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Age:</span>
                <span className="text-sm font-medium text-gray-900">{patient.age} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Owner:</span>
                <span className="text-sm font-medium text-gray-900">{patient.owner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Last Visit:</span>
                <span className="text-sm font-medium text-gray-900">{patient.lastVisit}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <button 
                onClick={() => setSelectedPatientId(patient.id)}
                className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View Medical History
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPatientId && (
        <MedicalRecord
          patientId={selectedPatientId}
          onClose={() => setSelectedPatientId(null)}
        />
      )}
    </div>
  );
};

export default Patients;