import React from 'react';
import { format } from 'date-fns';
import type { Appointment } from '../../lib/types';
import { Calendar, Clock, User, FileText, X } from 'lucide-react';

interface AppointmentDetailsProps {
  appointment: Appointment;
  onClose: () => void;
  onStatusChange: (appointmentId: string, status: Appointment['status']) => void;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointment,
  onClose,
  onStatusChange,
}) => {
  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-gray-800 text-white';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-lg w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Appointment Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
            <select
              value={appointment.status}
              onChange={(e) => onStatusChange(appointment.id, e.target.value as Appointment['status'])}
              className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no-show">No Show</option>
            </select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{format(new Date(appointment.date), 'PPPP')}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2" />
              <span>{appointment.startTime} - {appointment.endTime}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <User className="h-5 w-5 mr-2" />
              <div>
                <p className="font-medium">{appointment.patientName}</p>
                <p className="text-sm text-gray-500">Owner: {appointment.ownerName}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-600">
              <FileText className="h-5 w-5 mr-2" />
              <div>
                <p className="font-medium">Type: {appointment.type}</p>
                {appointment.reason && (
                  <p className="text-sm text-gray-500">Reason: {appointment.reason}</p>
                )}
              </div>
            </div>

            {appointment.notes && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-1">Notes</h4>
                <p className="text-sm text-gray-600">{appointment.notes}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Close
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Edit Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;