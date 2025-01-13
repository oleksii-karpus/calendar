import { useSelector } from 'react-redux';
import { RootState } from '../store/types/root.state';
import { Event, FilteredEvents } from '../common/types/event';

export const useFilteredEvents = (searchQuery: string) => {
    const publicHolidays = useSelector((state: RootState) => state.events.publicHolidays);
    const userEvents = useSelector((state: RootState) => state.events.userEvents);

    const filterByText = (events: Event[]): FilteredEvents[] => {
        if (!searchQuery.trim()) {
            return events.map(event => ({ ...event, hidden: false }));
        }
        return events.map(event => ({
            ...event,
            hidden: !(
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase()))
            )
        }));
    };

    return {
        events: {
            publicHolidays: filterByText(publicHolidays),
            userEvents: filterByText(userEvents)
        }
    };
};
