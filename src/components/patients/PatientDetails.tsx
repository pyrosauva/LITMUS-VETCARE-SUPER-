import React from 'react';
import { format } from 'date-fns';
import { Patient } from '../../lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import MedicalHistory from './MedicalHistory';
import Vaccinations from './Vaccinations';
import BillingHistory from './BillingHistory';
import { Phone, Mail, MapPin } from 'lucide-react';

interface PatientDetailsProps {
  patient: Patient;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patient }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{patient.name}</h2>
            <p className="text-sm text-gray-500">
              {patient.species} • {patient.breed} • {patient.age} years • {patient.weight}kg
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium
            ${patient.bills.some(bill => bill.status === 'overdue') 
              ? 'bg-red-100 text-red-800' 
              : 'bg-green-100 text-green-800'}`}>
            {patient.bills.some(bill => bill.status === 'overdue') ? 'Payment Overdue' : 'Active'}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2" />
            {patient.owner.phone}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="h-4 w-4 mr-2" />
            {patient.owner.email}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {patient.owner.address}
          </div>
        </div>
      </div>

      <Tabs defaultValue="medical" className="p-6">
        <TabsList>
          <TabsTrigger value="medical">Medical History</TabsTrigger>
          <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="medical">
          <MedicalHistory records={patient.medicalHistory} />
        </TabsContent>

        <TabsContent value="vaccinations">
          <Vaccinations vaccinations={patient.vaccinations} />
        </TabsContent>

        <TabsContent value="billing">
          <BillingHistory bills={patient.bills} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDetails;