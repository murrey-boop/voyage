// components/BookingCalendar.tsx
'use client';
import { useState, useEffect } from 'react';
import { format, eachDayOfInterval } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface BookingCalendarProps {
  tourId: string;
  availability: {
    startDate: Date;
    endDate: Date;
    maxPeople: number;
    bookedSlots: number;
  }[];
  onDateSelect: (date: Date) => void;
}

export function BookingCalendar({
  tourId,
  availability,
  onDateSelect,
}: BookingCalendarProps) {
  const [date, setDate] = useState<Date | undefined>();
  const [availableDates, setAvailableDates] = useState<Date[]>([]);

  useEffect(() => {
    // Calculate all available dates from availability ranges
    const dates = availability.flatMap(range => {
      const days = eachDayOfInterval({
        start: new Date(range.startDate),
        end: new Date(range.endDate),
      });
      // Only include days if the range has available slots
      return range.maxPeople > range.bookedSlots ? days : [];
    });
    setAvailableDates(dates);
  }, [availability]);

  const isDateAvailable = (day: Date) => {
    return availableDates.some(availableDate => 
      format(availableDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
  };

  return (
    <div className="space-y-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate: Date | undefined) => {
              if (selectedDate && isDateAvailable(selectedDate)) {
            setDate(selectedDate);
            onDateSelect(selectedDate);
              }
            }}
            disabled={(day: Date) => !isDateAvailable(day)}
            modifiers={{
              available: availableDates,
            }}
            modifiersStyles={{
              available: {
            border: '2px solid #16a34a',
              },
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {date && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Available Time Slots</h4>
          <div className="grid grid-cols-3 gap-2">
            {['09:00', '12:00', '15:00'].map(time => (
              <Button
                key={time}
                variant="outline"
                onClick={() => {
                  const dateTime = new Date(date);
                  const [hours, minutes] = time.split(':');
                  dateTime.setHours(parseInt(hours));
                  dateTime.setMinutes(parseInt(minutes));
                  onDateSelect(dateTime);
                }}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}