import { Country } from '../../../common/types/country';

export interface CalendarState {
    currentYear: number;
    countryCode: string;
    currentDate: string;
    currentMonth: number;
    availableCountries: Country[];
}
