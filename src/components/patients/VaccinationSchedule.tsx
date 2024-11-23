import React from 'react';
import { Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import type { Vaccination } from '../../lib/types';
import { format, addDays } from 'date-fns';

interface VaccinationScheduleProps {
  vaccinations: Vaccination[];
  species: string;
  age: number;
}

const VaccinationSchedule: React.FC<VaccinationScheduleProps> = ({
  vaccinations,
  species,
  age,
}) => {
  const recommendedVaccinations = React.useMemo(() => {
    // This would typically come from a medical database
    const dogVaccinations = [
      { name: 'Rabies', frequency: 'Annual', required: true },
      { name: 'DHPP', frequency: 'Every 3 years', required: true },
      { name: 'Bordetella', frequency: 'Every 6 months', required: false },
      { name: 'Lyme', frequency: 'Annual', required: false },
      { name: 'Influenza', frequency: 'Annual', required: false },
    ];

    const catVaccinations = [
      { name: 'Rabies', frequency: 'Annual', required: true },
      { name: 'FVRCP', frequency: 'Every 3 years', required: true },
      { name: 'FeLV', frequency: 'Annual', required: false },
    ];

    return species.toLowerCase() === 'cat' ? catVaccinations : dogVaccinations;
  }, [species]);

  const getVaccinationStatus = (vaccineName: string) => {
    const vaccination = vaccinations.find(v => v.name === vaccineName);
    if (!vaccination) return 'due';
    
    const lastDate = new Date(vaccination.date);
    const nextDue = addDays(lastDate, vaccination.validityPeriod);
    return new Date() > nextDue ? 'overdue' : 'current';
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-900">Vaccination Schedule</h3>
            <p className="mt-1 text-sm text-blue-700">
              Keep your pet protected with up-to-date vaccinations
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vaccination
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Frequency
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Given
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Due
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recommendedVaccinations.map((vaccine) => {
              const vaccination = vaccinations.find(v => v.name === vaccine.name);
              const status = getVaccinationStatus(vaccine.name);

              return (
                <tr key={vaccine.name}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {vaccine.name}
                      </div>
                      {vaccine.required && (
                        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Required
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vaccine.frequency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vaccination ? format(new Date(vaccination.date), 'MMM d, yyyy') : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vaccination
                      ? format(addDays(new Date(vaccination.date), vaccination.validityPeriod), 'MMM d, yyyy')
                      : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {status === 'current' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Current
                      </span>
                    ) : status === 'due' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Due
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Overdue
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VaccinationSchedule;