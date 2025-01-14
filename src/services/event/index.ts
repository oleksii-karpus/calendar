import { v4 as uuidv4 } from 'uuid';
import { axiosAdapter } from '../../common/api/axios.adapter';
import { PublicHolidaysParams } from '../../scenes/Events/types/public.holidays.params';
import { AppResponse } from '../../common/types/app.response';
import { Event, EventDndData, NewEvent } from '../../common/types/event';
import { localStorageService } from '../local-storage';
import { exampleTasks } from '../../common/mock.data';
import { moveEventToEmptyDay, reorderOrMoveEvent } from '../../utils/event.dnd.operations';
import { PublicHolidaysDto } from './dto/public.holidays.dto';
import { eventMapper } from './event.mapper';

class EventService {
    #storageKey = 'user-events';

    #getUserEventsFromStorage(): Event[] {
        const events = localStorageService.getObject(this.#storageKey);
        if (events === null) {
            localStorageService.setObject(this.#storageKey, exampleTasks);
            return exampleTasks;
        }
        return events;
    }

    #saveUserEventsToStorage(events: Event[]): void {
        localStorageService.setObject(this.#storageKey, events);
    }

    async getPublicHolidays(payload: PublicHolidaysParams): Promise<AppResponse<Event[]>> {
        const { data } = await axiosAdapter.doGet<PublicHolidaysDto[]>({
            url: `/v3/PublicHolidays/${payload.year}/${payload.countryCode}`
        });
        return { data: data.map(event => eventMapper.mapPublicHolidayDtoToEvent(event)) };
    }

    createUserEvent(activeEvent: NewEvent): AppResponse<Event> {
        if (!activeEvent) {
            throw new Error('Failed to create event: event data is missing or invalid.');
        }
        const userEvents = this.#getUserEventsFromStorage();
        const eventListWithTheSameDate = userEvents.filter(event => event.date === activeEvent.date);
        const newEventOrder = eventListWithTheSameDate.length + 1;
        const newEvent: Event = { ...activeEvent, id: uuidv4(), order: newEventOrder };

        this.#saveUserEventsToStorage([...userEvents, newEvent]);
        return { data: newEvent };
    }

    getUserEvents(): AppResponse<Event[]> {
        return { data: this.#getUserEventsFromStorage() };
    }

    deleteUserEvent(id: string): AppResponse<boolean> {
        const userEvents = this.#getUserEventsFromStorage();
        const activeEvent = userEvents.find(event => event.id === id);
        if (!activeEvent) {
            throw new Error(`Failed to delete event: event with ID ${id} not found.`);
        }

        const updatedEvents = this.#reorderEventsAfterDeletion(userEvents, activeEvent);

        this.#saveUserEventsToStorage(updatedEvents);
        return { data: true };
    }

    updateUserEvent(activeEvent: Event): AppResponse<Event[]> {
        const userEvents = this.#getUserEventsFromStorage();
        const oldEventDay = userEvents.find(event => event.id === activeEvent.id)?.date;
        if (!oldEventDay) {
            throw new Error(`Failed to update event: event with ID ${activeEvent.id} does not exist.`);
        }

        const updatedEvents =
            oldEventDay === activeEvent.date
                ? this.#updateSameDayEvent(userEvents, activeEvent)
                : this.#updateDifferentDayEvent(userEvents, activeEvent, oldEventDay);

        this.#saveUserEventsToStorage(updatedEvents);
        return { data: updatedEvents };
    }

    #updateSameDayEvent(userEvents: Event[], activeEvent: Event): Event[] {
        return userEvents.map(event => (event.id === activeEvent.id ? activeEvent : event));
    }

    #updateDifferentDayEvent(userEvents: Event[], activeEvent: Event, oldEventDay: string): Event[] {
        const targetEvent = userEvents.find(event => event.date === activeEvent.date && event.order === 1);

        if (!targetEvent) {
            return userEvents.map(userEvent => {
                const { isEventUpdated, event } = moveEventToEmptyDay(
                    userEvent,
                    activeEvent.id,
                    activeEvent,
                    activeEvent.date
                );
                return isEventUpdated && event ? event : userEvent;
            });
        }

        return userEvents.map(userEvent => {
            const { isEventUpdated, event } = reorderOrMoveEvent(userEvent, targetEvent, {
                ...activeEvent,
                date: oldEventDay
            });
            return isEventUpdated && event ? event : userEvent;
        });
    }

    #reorderEventsAfterDeletion(userEvents: Event[], activeEvent: Event): Event[] {
        return userEvents
            .filter(event => event.id !== activeEvent.id)
            .map(event =>
                event.date === activeEvent.date && event.order > activeEvent.order
                    ? { ...event, order: event.order - 1 }
                    : event
            );
    }

    moveUserEvent(payload: EventDndData): AppResponse<Event[]> {
        const { activeEvent, targetEvent, targetDayId } = payload;
        const userEvents = this.#getUserEventsFromStorage();

        const moveFunction = targetEvent
            ? (userEvent: Event) => reorderOrMoveEvent(userEvent, targetEvent, activeEvent)
            : (userEvent: Event) => moveEventToEmptyDay(userEvent, activeEvent.id, activeEvent, targetDayId);

        const updatedEvents = userEvents.map(userEvent => {
            const { isEventUpdated, event } = moveFunction(userEvent);
            return isEventUpdated && event ? event : userEvent;
        });

        this.#saveUserEventsToStorage(updatedEvents);
        return { data: updatedEvents };
    }
}

export const eventService = new EventService();
