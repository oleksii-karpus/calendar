import { useState, useRef, MouseEvent, RefObject } from 'react';
import { EventPopoverMode, NewEvent, Event } from '../common/types/event';

interface UseEventPopoverResult {
    anchorEl: HTMLElement | null;
    popoverData: Event | NewEvent | null;
    mode: EventPopoverMode;
    handleEventClick: (e: MouseEvent<HTMLElement>, event: Event) => void;
    handleClose: () => void;
    handleCreateClick: (defaultData: NewEvent) => void;
    refElement: RefObject<HTMLDivElement | null>;
}

export const useEventPopover = (): UseEventPopoverResult => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [popoverData, setPopoverData] = useState<Event | NewEvent | null>(null);
    const [mode, setMode] = useState<EventPopoverMode>('view');
    const refElement = useRef<HTMLDivElement | null>(null);

    const handleEventClick = (e: MouseEvent<HTMLElement>, event: Event) => {
        e.stopPropagation();
        setMode(event.global ? 'view' : 'edit');
        setAnchorEl(e.currentTarget);
        setPopoverData(event);
    };

    const handleCreateClick = (defaultData: NewEvent) => {
        setAnchorEl(refElement.current);
        setMode('create');
        setPopoverData(defaultData);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setPopoverData(null);
    };

    return {
        anchorEl,
        popoverData,
        mode,
        handleEventClick,
        handleClose,
        handleCreateClick,
        refElement
    };
};
