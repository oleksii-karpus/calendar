import { CalendarState } from '../types/calendar.state';

export const updateYear = (state: CalendarState, year: number): CalendarState => ({
    ...state,
    currentYear: year
});

export const updateCurrentDate = (state: CalendarState, date: string): CalendarState => ({
    ...state,
    currentDate: date
});

export const updateCurrentMonth = (state: CalendarState, month: number): CalendarState => ({
    ...state,
    currentMonth: month
});
