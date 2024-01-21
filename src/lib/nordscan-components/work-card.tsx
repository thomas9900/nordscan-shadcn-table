import React, { useState, useCallback } from 'react';
import { DatePickerWithRange } from './date-picker-with-range';
import TeamSwitcher, { Team } from './user-switcher';
import { Card } from '@/components/ui/card';
import { InputForm } from './work-card-input';
import { DateRange } from 'react-day-picker';

const WorkCard = () => {
  const [employeeData, setEmployeeData] = useState({
    hours: 0,
    dateRange: undefined,
    selectedEmployee: null as Team | null,
    comment: '', // Add comment property
  } as { hours: number; dateRange?: DateRange; selectedEmployee: Team | null; comment: string });

  const handleDateChange = useCallback(
    (newDate: DateRange) => {
      console.log('Date range changed:', newDate);
      setEmployeeData((prevEmployeeData) => ({
        ...prevEmployeeData,
        dateRange: newDate,
      }));
    },
    []
  );

  const handleEmployeeDataSubmit = useCallback(
    async (newHours: number, comment: string) => {
      console.log('New hours submitted:', newHours);

      try {
        const response = await fetch('https://myproject-ffd79-default-rtdb.europe-west1.firebasedatabase.app/workData.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            hours: newHours,
            dateRange: employeeData.dateRange,
            selectedEmployee: employeeData.selectedEmployee,
            comment: comment, // Include the comment in the request
          }),
        });

        if (response.ok) {
          console.log('Employee data submitted successfully');
        } else {
          console.error('Failed to submit employee data');
        }
      } catch (error) {
        console.error('Error submitting employee data:', error);
      }
    },
    [employeeData]
  );

  const handleTeamSelect = useCallback(
    (selectedEmployee: Team) => {
      console.log('Selected team:', selectedEmployee);
      setEmployeeData((prevEmployeeData) => ({
        ...prevEmployeeData,
        selectedEmployee: selectedEmployee,
      }));
    },
    []
  );

  return (
    <>
      <Card className="p-2 text-left">
        <h2 className="text-2xl font-bold tracking-tight text-left mb-4">
          Pick start and end dates of work
        </h2>
        <DatePickerWithRange onDateChange={handleDateChange} />
        <TeamSwitcher onTeamSelect={handleTeamSelect} />
        <InputForm onHoursSubmit={handleEmployeeDataSubmit} />
      </Card>
    </>
  );
};

export default WorkCard;
