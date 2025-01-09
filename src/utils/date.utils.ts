import dayjs, { Dayjs } from 'dayjs';

export const getMonthDays = (year: number, month: number, startOfWeek: 'monday' | 'sunday' = 'monday') => {
    const startOfMonth = dayjs(new Date(year, month, 1));
    const firstDayOfGrid =
        startOfWeek === 'monday' ? startOfMonth.startOf('week').add(1, 'day') : startOfMonth.startOf('week');
    let lastDayOfGrid = startOfMonth.endOf('month').endOf('week');

    if (startOfWeek === 'monday' && lastDayOfGrid.diff(firstDayOfGrid, 'day') + 1 < 42) {
        lastDayOfGrid = lastDayOfGrid.add(1, 'day');
    }

    const totalDays = lastDayOfGrid.diff(firstDayOfGrid, 'day') + 1;

    return Array.from({ length: totalDays }, (_, i) => {
        const date = firstDayOfGrid.add(i, 'day');
        return {
            date,
            isCurrentMonth: date.month() === month
        };
    });
};

export const getWeekDays = (date: Dayjs, startOfWeek: 'monday' | 'sunday' = 'monday') => {
    const weekStart = startOfWeek === 'monday' ? date.startOf('week').add(1, 'day') : date.startOf('week');
    return Array.from({ length: 7 }, (_, i) => weekStart.add(i, 'day'));
};

export const getWeekdayLabels = (startOfWeek: 'monday' | 'sunday' = 'monday') => {
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    if (startOfWeek === 'sunday') {
        return ['Sun', ...weekdays.slice(0, 6)];
    }
    return weekdays;
};
