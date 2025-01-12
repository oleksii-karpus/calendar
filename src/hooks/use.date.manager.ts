import { useDispatch, useSelector } from 'react-redux';
import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { RootState } from '../store/types/root.state';
import { getCalendarState } from '../utils/get.state.utils';
import {
    updateCurrentDateRoutine,
    updateCurrentMonthRoutine,
    updateYearRoutine
} from '../scenes/Calendar/store/routines';
import { AppDispatch } from '../store';
dayjs.extend(isoWeek);

type CalendarActions =
    | ReturnType<typeof updateCurrentDateRoutine.trigger>
    | ReturnType<typeof updateCurrentMonthRoutine.trigger>
    | ReturnType<typeof updateYearRoutine.trigger>;

export const useDateManager = () => {
    const dispatch: AppDispatch = useDispatch();
    const currentISODate = useSelector((state: RootState) => getCalendarState(state).currentDate);
    const currentYear = useSelector((state: RootState) => getCalendarState(state).currentYear);
    const currentMonth = useSelector((state: RootState) => getCalendarState(state).currentMonth);
    const currentDate = dayjs(currentISODate);
    const currentWeekStart = currentDate.startOf('isoWeek');

    const updateDate = (newDate: Dayjs, maxDate?: Dayjs) => {
        // The maximum year at the week boundary (used for events when the week spans across years)
        const eventYear = maxDate?.year() || newDate.year();
        const actions: Array<CalendarActions | undefined> = [
            updateCurrentDateRoutine.trigger(newDate.toISOString()),
            currentMonth !== newDate.month() ? updateCurrentMonthRoutine.trigger(newDate.month()) : undefined,
            currentYear !== eventYear ? updateYearRoutine.trigger(eventYear) : undefined
        ].filter((action): action is CalendarActions => !!action);

        actions.forEach(action => dispatch(action));
    };

    return {
        currentDate,
        currentYear,
        currentMonth,
        currentWeekStart,
        currentDayOfWeek: currentDate.format('dddd'),
        updateDate
    };
};
