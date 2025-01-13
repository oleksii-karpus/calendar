import { CalendarState } from '../types/calendar.state';
import { Country } from '../../../common/types/country';

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

export const setAvailableCountries = (state: CalendarState, countries: Country[]): CalendarState => ({
    ...state,
    availableCountries: countries
});

export const updateCountryCode = (state: CalendarState, code: string): CalendarState => ({
    ...state,
    countryCode: code
});
