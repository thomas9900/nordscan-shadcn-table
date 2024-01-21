import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format, startOfMonth, addMonths } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onDateChange?: (newDate: DateRange) => void;
}

export function DatePickerWithRange({
  className,
  onDateChange,
}: DatePickerWithRangeProps) {
  const currentDate = new Date();
  const fromMonth = startOfMonth(currentDate);
  const toMonth = addMonths(fromMonth, 1);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: fromMonth,
    to: addDays(toMonth, 0),
  });
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  // Call the onDateChange callback whenever the date changes
  React.useEffect(() => {
    if (onDateChange) {
      onDateChange(date || { from: undefined, to: undefined });
    }
  }, [date, onDateChange]);

  const handleOkClick = () => {
    setPopoverOpen(false);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover
        open={popoverOpen}
        onOpenChange={(newState) => setPopoverOpen(newState)}
      >
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
            {/* Display client data */}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {/* Set mode to "range" to allow selecting a date range */}
          <Calendar
            initialFocus
            mode="range"
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
          <Button className="m-2" onClick={handleOkClick}>
            Ok
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
