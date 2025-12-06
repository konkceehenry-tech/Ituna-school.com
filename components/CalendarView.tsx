import React, { useState, useMemo } from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { Priority } from './MyTasks';


interface CalendarEvent {
  id: number | string;
  title: string;
  date: Date;
  isOfficial: boolean;
  isComplete?: boolean;
  priority?: Priority;
}

interface CalendarViewProps {
  events: CalendarEvent[];
}

const getPriorityColor = (priority?: Priority) => {
    if (!priority) return 'bg-gray-500';
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
    }
};

const CalendarView: React.FC<CalendarViewProps> = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const startingDay = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    events.forEach(event => {
      const dateString = event.date.toISOString().split('T')[0];
      if (!map.has(dateString)) {
        map.set(dateString, []);
      }
      map.get(dateString)!.push(event);
    });
    return map;
  }, [events]);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarDays = [];
  
  // Add empty cells for days before the start of the month
  for (let i = 0; i < startingDay; i++) {
    calendarDays.push(<div key={`empty-start-${i}`} className="border-r border-b border-gray-700"></div>);
  }
  
  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = date.toISOString().split('T')[0];
    const dayEvents = eventsByDate.get(dateString) || [];
    const isToday = new Date().toISOString().split('T')[0] === dateString;

    calendarDays.push(
      <div key={day} className="p-2 border-r border-b border-gray-700 min-h-[120px] flex flex-col bg-black/30">
        <div className={`font-semibold text-sm self-start mb-1 ${isToday ? 'bg-sky-500 rounded-full w-6 h-6 flex items-center justify-center text-white' : 'text-gray-300'}`}>
          {day}
        </div>
        <div className="flex-grow overflow-y-auto text-xs space-y-1">
            {dayEvents.map(event => {
                const eventColor = event.isOfficial ? 'bg-sky-600' : getPriorityColor(event.priority);
                return (
                     <div key={event.id} className={`p-1 rounded text-white text-left ${eventColor} ${event.isComplete ? 'opacity-50 line-through' : ''}`}>
                        {event.title}
                    </div>
                )
            })}
        </div>
      </div>
    );
  }
  
  // Add empty cells for days after the end of the month to fill the grid
  const totalCells = startingDay + daysInMonth;
  const remainingCells = (7 - (totalCells % 7)) % 7;
  for (let i = 0; i < remainingCells; i++) {
    calendarDays.push(<div key={`empty-end-${i}`} className="border-r border-b border-gray-700"></div>);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPreviousMonth} className="p-2 rounded-full hover:bg-gray-700 transition-colors" aria-label="Previous month">
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-bold text-white">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button onClick={goToNextMonth} className="p-2 rounded-full hover:bg-gray-700 transition-colors" aria-label="Next month">
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 border-t border-l border-gray-700 bg-black/50">
        {weekDays.map(day => (
          <div key={day} className="p-2 text-center font-semibold text-gray-400 border-r border-b border-gray-700 text-sm">
            {day}
          </div>
        ))}
        {calendarDays}
      </div>
    </div>
  );
};

export default CalendarView;