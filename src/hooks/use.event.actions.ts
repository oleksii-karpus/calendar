import { useDispatch } from 'react-redux';
import { Event, NewEvent } from '../common/types/event';
import {
    createUserEventsRoutine,
    deleteUserEventsRoutine,
    updateUserEventsRoutine
} from '../scenes/Events/store/routines';
import { AppDispatch } from '../store';

type EventActions = {
    createEvent: (data: NewEvent) => void;
    updateEvent: (data: Event) => void;
    deleteEvent: (id: string) => void;
};

export const useEventActions = (): EventActions => {
    const dispatch: AppDispatch = useDispatch();

    const createEvent = (data: NewEvent) => {
        dispatch(createUserEventsRoutine.trigger(data));
    };

    const updateEvent = (data: Event) => {
        dispatch(updateUserEventsRoutine.trigger(data));
    };

    const deleteEvent = (id: string) => {
        dispatch(deleteUserEventsRoutine.trigger(id));
    };

    return { createEvent, updateEvent, deleteEvent };
};
