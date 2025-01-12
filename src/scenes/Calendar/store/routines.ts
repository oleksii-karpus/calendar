import { createRoutine } from 'redux-saga-routines';

export const updateYearRoutine = createRoutine<number>('calendar/update-year');
export const updateCurrentDateRoutine = createRoutine<string>('calendar/update-current-date');
export const updateCurrentMonthRoutine = createRoutine<number>('calendar/update-current-month');
