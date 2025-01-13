import { createRoutine } from 'redux-saga-routines';
import { Country } from '../../../common/types/country';

export const updateYearRoutine = createRoutine<number>('calendar/update-year');
export const updateCurrentDateRoutine = createRoutine<string>('calendar/update-current-date');
export const updateCurrentMonthRoutine = createRoutine<number>('calendar/update-current-month');
export const getAvailableCountriesRoutine = createRoutine<Country[]>('calendar/get-available-countries');
export const updateCountryCodeRoutine = createRoutine<string>('calendar/update-country-code');
export const getCurrentCountryCodeRoutine = createRoutine<string>('calendar/get-current-country-code');
