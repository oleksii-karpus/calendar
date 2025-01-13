import { Routine } from 'redux-saga-routines';
import dayjs from 'dayjs';
import { CalendarState } from '../types/calendar.state';
import { ReducerHandlers } from '../../../store/types/reducer.handlers';
import { defaultCountryCode } from '../../../common/constants/country';
import {
    getAvailableCountriesRoutine,
    updateCountryCodeRoutine,
    updateCurrentDateRoutine,
    updateCurrentMonthRoutine,
    updateYearRoutine
} from './routines';
import {
    setAvailableCountries,
    updateCountryCode,
    updateCurrentDate,
    updateCurrentMonth,
    updateYear
} from './handlers';

const date = dayjs();
const initialState: CalendarState = {
    countryCode: defaultCountryCode,
    currentYear: date.year(),
    currentDate: date.toISOString(),
    currentMonth: date.month(),
    availableCountries: []
};

const handlers: ReducerHandlers<CalendarState> = {
    [updateYearRoutine.SUCCESS]: updateYear,
    [updateCurrentDateRoutine.SUCCESS]: updateCurrentDate,
    [updateCurrentMonthRoutine.SUCCESS]: updateCurrentMonth,
    [getAvailableCountriesRoutine.SUCCESS]: setAvailableCountries,
    [updateCountryCodeRoutine.SUCCESS]: updateCountryCode
};

const CalendarReducer = (
    state = initialState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { type, payload }: Routine<any> = {}
): CalendarState => {
    const handler = handlers[type];
    if (handler) {
        return handler(state, payload);
    }
    return state;
};

export default CalendarReducer;
