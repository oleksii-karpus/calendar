import { FC, useRef, useState, MouseEvent } from 'react';
import { Draggable } from '../../../../components/Draggable';
import { EventCard } from '../EventCard';
import { Droppable } from '../../../../components/Droppable';
import { EventPopover } from '../../../Events/EventPopover';
import { Event, EventPopoverMode, FilteredEvents, NewEvent } from '../../../../common/types/event';
import { DropAreaStyled, WrapperStyled } from './index.styles';

export interface DayCellProps {
    dayId: string;
    dayNumber: number;
    events: {
        userEvents: FilteredEvents[];
        publicHolidays: FilteredEvents[];
    };
    className?: string;
}

export const DayCell: FC<DayCellProps> = ({ dayId, dayNumber, events, className }) => {
    const eventsLength = events.userEvents.length + events.publicHolidays.length;
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [mode, setMode] = useState<EventPopoverMode>('view');
    const dayCellRef = useRef<HTMLDivElement | null>(null);
    const [popoverData, setPopoverData] = useState<Event | null | NewEvent>(null);

    const handleEventClick = (e: MouseEvent<HTMLElement>, userEvent: Event) => {
        e.stopPropagation();
        setMode(() => (userEvent.global ? 'view' : 'edit'));
        setAnchorEl(dayCellRef.current);
        setPopoverData(userEvent);
    };

    const handleDayClick = () => {
        setAnchorEl(dayCellRef.current);
        setMode('create');
        setPopoverData({
            date: dayId,
            description: '',
            order: events.userEvents.length + 1,
            priority: undefined,
            title: 'New Event'
        });
    };

    const handleClose = () => {
        setPopoverData(null);
        setAnchorEl(null);
    };

    return (
        <WrapperStyled key={dayId} className={className} ref={dayCellRef}>
            <div role="presentation" onClick={handleDayClick}>
                {dayNumber} {eventsLength > 0 && `${eventsLength} cards`}
            </div>
            {events.publicHolidays.map(event => (
                <div
                    key={event.id}
                    role="presentation"
                    onClick={e => handleEventClick(e, event)}
                    style={{
                        opacity: event.hidden ? '0.1' : '1'
                    }}
                >
                    <EventCard title={event.title} />
                </div>
            ))}
            {events.userEvents.length > 0 ? (
                events.userEvents
                    .sort((a, b) => a.order - b.order)
                    .map(event => (
                        <Draggable
                            key={event.id}
                            id={event.id}
                            day={event.date}
                            order={event.order}
                            onClick={e => handleEventClick(e, event)}
                        >
                            <div
                                style={{
                                    opacity: event.hidden ? '0.1' : '1',
                                    pointerEvents: event.hidden ? 'none' : 'all'
                                }}
                            >
                                <EventCard title={event.title} />
                            </div>
                        </Draggable>
                    ))
            ) : (
                <Droppable id={dayId}>
                    <DropAreaStyled onClick={handleDayClick} />
                </Droppable>
            )}
            <EventPopover
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                mode={mode}
                event={popoverData}
            />
        </WrapperStyled>
    );
};
