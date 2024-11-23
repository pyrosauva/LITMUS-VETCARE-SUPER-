import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import type { Staff } from '../../lib/types';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface StaffSchedulerProps {
  staff: Staff[];
  onScheduleChange: (staffId: string, schedule: any) => void;
}

const StaffScheduler: React.FC<StaffSchedulerProps> = ({ staff, onScheduleChange }) => {
  const [selectedStaff, setSelectedStaff] = React.useState<string>(staff[0]?.id || '');

  const events = React.useMemo(() => {
    const currentStaff = staff.find(s => s.id === selectedStaff);
    if (!currentStaff) return [];

    return Object.entries(currentStaff.schedule).map(([day, hours]) => ({
      id: `${currentStaff.id}-${day}`,
      title: `${currentStaff.name} - ${format(new Date(\`2024-01-${day}\`), 'EEEE')}`,
      start: new Date(\`2024-01-${day}T${hours.start}\`),
      end: new Date(\`2024-01-${day}T${hours.end}\`),
    }));
  }, [selectedStaff, staff]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Staff Member</label>
          <select
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {staff.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name} - {member.role}
              </option>
            ))}
          </select>
        </div>

        <div className="h-[600px]">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            views={['week', 'day']}
            defaultView="week"
            step={30}
            timeslots={2}
            selectable
            onSelectSlot={(slotInfo) => {
              onScheduleChange(selectedStaff, {
                start: format(slotInfo.start, 'HH:mm'),
                end: format(slotInfo.end, 'HH:mm'),
                day: format(slotInfo.start, 'd'),
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StaffScheduler;