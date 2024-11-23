import React from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import type { Appointment } from '../../lib/types';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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

interface CalendarProps {
  appointments: Appointment[];
  onSelectSlot: (slotInfo: { start: Date; end: Date }) => void;
  onSelectEvent: (appointment: Appointment) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  appointments,
  onSelectSlot,
  onSelectEvent,
}) => {
  const events = appointments.map((appointment) => ({
    id: appointment.id,
    title: `${appointment.patientName} - ${appointment.type}`,
    start: new Date(`${appointment.date}T${appointment.startTime}`),
    end: new Date(`${appointment.date}T${appointment.endTime}`),
    resource: appointment,
  }));

  const eventStyleGetter = (event: any) => {
    const appointment: Appointment = event.resource;
    let backgroundColor = '';

    switch (appointment.status) {
      case 'scheduled':
        backgroundColor = '#93C5FD'; // blue-300
        break;
      case 'confirmed':
        backgroundColor = '#34D399'; // green-400
        break;
      case 'in-progress':
        backgroundColor = '#FCD34D'; // yellow-300
        break;
      case 'completed':
        backgroundColor = '#6B7280'; // gray-500
        break;
      case 'cancelled':
        backgroundColor = '#EF4444'; // red-500
        break;
      case 'no-show':
        backgroundColor = '#1F2937'; // gray-800
        break;
      default:
        backgroundColor = '#93C5FD';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: 'none',
        display: 'block',
      },
    };
  };

  return (
    <div className="h-[600px] bg-white rounded-lg shadow-sm p-4">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={onSelectSlot}
        onSelectEvent={(event) => onSelectEvent(event.resource)}
        eventPropGetter={eventStyleGetter}
        views={['month', 'week', 'day']}
        defaultView="week"
        step={30}
        timeslots={2}
      />
    </div>
  );
};

export default Calendar;