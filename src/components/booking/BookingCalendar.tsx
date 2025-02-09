import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, addDays, isBefore, isAfter } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';

interface BookingCalendarProps {
  onSelect: (date: Date) => void;
  selectedDate?: Date;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ onSelect, selectedDate }) => {
  const { data: bookedDates } = useQuery({
    queryKey: ['bookedDates'],
    queryFn: async () => {
      const { data } = await supabase
        .from('bookings')
        .select('booking_date')
        .gte('booking_date', new Date().toISOString());
      
      return data?.map(b => new Date(b.booking_date)) || [];
    }
  });

  const disabledDays = [
    { before: new Date() },
    { after: addDays(new Date(), 45) },
    ...(bookedDates || [])
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && onSelect(date)}
        disabled={disabledDays}
        modifiers={{
          booked: bookedDates || []
        }}
        modifiersStyles={{
          booked: { color: 'red' }
        }}
        className="rdp-custom"
      />
    </div>
  );
};

export default BookingCalendar;