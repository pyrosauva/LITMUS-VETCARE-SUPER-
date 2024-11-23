import React from 'react';
import { Calendar, FileText, Bell, MessageSquare, Clock } from 'lucide-react';
import { format } from 'date-fns';
import type { Patient, Appointment, Prescription } from '../../lib/types';

interface PatientPortalProps {
  patient: Patient;
  appointments: Appointment[];
  prescriptions: Prescription[];
}

const PatientPortal: React.FC<PatientPortalProps> = ({
  patient,
  appointments,
  prescriptions,
}) => {
  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const activePrescriptions = prescriptions
    .filter(p => p.status === 'active')
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Welcome back, {patient.owner.name}</h2>
            <p className="text-gray-500">Managing {patient.name}'s health records</p>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
              <MessageSquare className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-900">Next Appointment</p>
                <p className="text-lg font-semibold text-blue-700">
                  {upcomingAppointments[0] ? format(new Date(upcomingAppointments[0].date), 'MMM d, yyyy') : 'No upcoming'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-green-900">Active Prescriptions</p>
                <p className="text-lg font-semibold text-green-700">{activePrescriptions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-purple-900">Last Visit</p>
                <p className="text-lg font-semibold text-purple-700">
                  {format(new Date(patient.lastVisit), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Appointments</h3>
          <div className="space-y-4">
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{apt.type}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(apt.date), 'MMM d, yyyy')} at {apt.startTime}
                  </p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Reschedule
                </button>
              </div>
            ))}
            <button className="w-full mt-4 text-center text-sm font-medium text-blue-600 hover:text-blue-700">
              Schedule New Appointment
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Active Prescriptions</h3>
          <div className="space-y-4">
            {activePrescriptions.map((prescription) => (
              <div key={prescription.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{prescription.medication}</p>
                    <p className="text-sm text-gray-500">
                      {prescription.dosage} • {prescription.frequency}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    Refills: {prescription.refills}
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Started {format(new Date(prescription.startDate), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;