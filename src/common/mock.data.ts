import dayjs from 'dayjs';
import { Event } from './types/event';
import { DateFormats } from './enums/date.formats';

export const exampleTasks: Event[] = [
    {
        id: '1',
        title: 'Meeting',
        description: 'Team meeting at 10am',
        priority: 'high',
        order: 1,
        date: dayjs().format(DateFormats.isoDate)
    },
    {
        id: '2',
        title: 'Presentation',
        description: 'Prepare slides',
        priority: 'medium',
        order: 2,
        date: dayjs().format(DateFormats.isoDate)
    },
    {
        id: '3',
        title: 'Workout',
        description: 'Morning gym session',
        priority: 'low',
        order: 1,
        date: dayjs().add(2, 'day').format(DateFormats.isoDate)
    }
];
