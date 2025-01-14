import { useState } from 'react';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import { Event } from '../common/types/event';
import { RootState } from '../store/types/root.state';
import { getEventsState } from '../utils/get.state.utils';
import { moveUserEventsRoutine } from '../scenes/Events/store/routines';
import { AppDispatch } from '../store';

export const useDndHandlers = () => {
    const dispatch: AppDispatch = useDispatch();
    const userEvents = useSelector((rootState: RootState) => getEventsState(rootState).userEvents);
    const [draggedEvent, setDraggedEvent] = useState<Event | null>(null);

    const handleDragStart = (event: DragStartEvent) => {
        const activeEventId = String(event.active.id);
        const userEvent = userEvents.find(e => e.id === activeEventId);
        if (userEvent) {
            setDraggedEvent(userEvent);
        }
    };

    const handleDragEnd = ({ active, over }: DragEndEvent): void => {
        setDraggedEvent(null);
        if (!over || !active?.data?.current) return;

        const activeEvent = active.data.current as Event;
        const targetEvent = over.data.current as Event | null;
        const targetDayId = String(over.id);

        dispatch(
            moveUserEventsRoutine.trigger({
                activeEvent,
                targetEvent,
                targetDayId
            })
        );
    };

    return {
        draggedEvent,
        handleDragStart,
        handleDragEnd
    };
};
