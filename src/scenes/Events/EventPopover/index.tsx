import { Popover, PopoverOrigin } from '@mui/material';
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
    anchorOrigin?: PopoverOrigin | undefined;
    transformOrigin?: PopoverOrigin | undefined;
}

export const EventPopover: FC<EventPopoverProps> = ({
    anchorEl,
    onClose,
    open,
    mode = 'view',
    event,
    anchorOrigin,
    transformOrigin
}) => {
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
            anchorOrigin={anchorOrigin ? anchorOrigin : { vertical: 'top', horizontal: 'right' }}
            transformOrigin={transformOrigin ? transformOrigin : { vertical: 'top', horizontal: 'left' }}
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
