import { Popover } from '@mui/material';
import { FC } from 'react';
import { Event, EventPopoverMode, NewEvent } from '../../../common/types/event';
import { useEventActions } from '../../../hooks/use.event.actions';
import { eventPopoverFactory } from './event.popover.factory';

interface EventPopoverProps {
    anchorEl: HTMLElement | null;
    onClose: () => void;
    open: boolean;
    mode?: EventPopoverMode;
    event: Event | NewEvent | null;
}

export const EventPopover: FC<EventPopoverProps> = ({ anchorEl, onClose, open, mode = 'view', event }) => {
    const { updateEvent, createEvent, deleteEvent } = useEventActions();

    const updateEventHandler = (data: Event) => {
        updateEvent(data);
        onClose();
    };
    const createEventHandler = (data: NewEvent) => {
        createEvent(data);
        onClose();
    };

    const deleteEventHandler = (id: string) => {
        deleteEvent(id);
        onClose();
    };

    if (!event) {
        return null;
    }

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
            {eventPopoverFactory({
                mode,
                event,
                onUpdate: updateEventHandler,
                onCreate: createEventHandler,
                onDelete: deleteEventHandler
            })}
        </Popover>
    );
};
