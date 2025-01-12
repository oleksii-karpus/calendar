import { useState } from 'react';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import { Event } from '../common/types/event';
import { DragItemData } from '../common/types/drag.item.data';
import { moveEventToEmptyDay, reorderOrMoveEvent } from '../utils/event.dnd.operations';
import { RootState } from '../store/types/root.state';
import { getEventsState } from '../utils/get.state.utils';
import { updateUserEventsRoutine } from '../scenes/Events/store/routines';
import { AppDispatch } from '../store';

export const useDndEvents = () => {
    const dispatch: AppDispatch = useDispatch();
    const publicHolidays = useSelector((rootState: RootState) => getEventsState(rootState).publicHolidays);
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

        const activeEvent = active.data.current as DragItemData;
        const activeEventId = String(active.id);
        const targetEvent = over.data.current as DragItemData;
        const targetDayId = String(over.id);
        if (!targetEvent) {
            const updatedEvents = userEvents.reduce((acc: Event[], userEvent) => {
                const { isEventUpdated, event } = moveEventToEmptyDay(
                    userEvent,
                    activeEventId,
                    activeEvent,
                    targetDayId
                );
                if (isEventUpdated && event) {
                    acc.push(event);
                }
                return acc;
            }, []);
            dispatch(updateUserEventsRoutine.trigger(updatedEvents));
            return;
        }

        const updatedEvents = userEvents.reduce((acc: Event[], userEvent) => {
            const { isEventUpdated, event } = reorderOrMoveEvent(userEvent, targetEvent, activeEvent);
            if (isEventUpdated && event) {
                acc.push(event);
            }
            return acc;
        }, []);
        dispatch(updateUserEventsRoutine.trigger(updatedEvents));
    };

    return {
        events: {
            publicHolidays,
            userEvents
        },
        draggedEvent,
        handleDragStart,
        handleDragEnd
    };
};
