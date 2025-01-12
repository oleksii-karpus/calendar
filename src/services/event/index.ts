import { v4 as uuidv4 } from 'uuid';
import { axiosAdapter } from '../../common/api/axios.adapter';
import { PublicHolidaysParams } from '../../scenes/Events/types/public.holidays.params';
import { AppResponse } from '../../common/types/app.response';
import { Event, NewEvent } from '../../common/types/event';
import { localStorageService } from '../local-storage';
import { exampleTasks } from '../../common/mock.data';
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

    createUserEvent(event: NewEvent): AppResponse<Event> {
        const userEvents = this.#getUserEventsFromStorage();
        const newEvent: Event = { ...event, id: uuidv4() };
        this.#saveUserEventsToStorage([...userEvents, newEvent]);
        return { data: newEvent };
    }

    getUserEvents(): AppResponse<Event[]> {
        const userEvents = this.#getUserEventsFromStorage();
        return { data: userEvents };
    }

    deleteUserEvent(id: string): AppResponse<boolean> {
        const userEvents = this.#getUserEventsFromStorage();
        const filteredEvents = userEvents.filter(event => event.id !== id);
        this.#saveUserEventsToStorage(filteredEvents);
        return { data: true };
    }

    updateUserEvent(events: Event[]): AppResponse<Event[]> {
        const userEvents = this.#getUserEventsFromStorage();
        const updatedEventsMap = new Map(events.map(event => [event.id, event]));
        const updatedEvents = userEvents.map(event => updatedEventsMap.get(event.id) || event);
        this.#saveUserEventsToStorage(updatedEvents);
        return { data: updatedEvents };
    }
}

export const eventService = new EventService();
