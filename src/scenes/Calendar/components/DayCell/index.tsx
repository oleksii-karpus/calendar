import { FC } from 'react';
import { Draggable } from '../../../../components/Draggable';
import { EventCard } from '../EventCard';
import { Droppable } from '../../../../components/Droppable';
import { EventsState } from '../../../Events/types/events.state';
import { DropAreaStyled, WrapperStyled } from './index.styles';

export interface DayCellProps {
    dayId: string;
    dayNumber: number;
    events: EventsState;
    className?: string;
}

export const DayCell: FC<DayCellProps> = ({ dayId, dayNumber, events, className }) => {
    const eventsLength = events.userEvents.length + events.publicHolidays.length;

    return (
        <WrapperStyled key={dayId} className={className}>
            <div>
                {dayNumber} {eventsLength > 0 && `${eventsLength} cards`}
            </div>
            {events.publicHolidays.map(event => (
                <EventCard key={event.id} title={event.title} />
            ))}
            {events.userEvents.length > 0 ? (
                events.userEvents
                    .sort((a, b) => a.order - b.order)
                    .map(event => (
                        <Draggable key={event.id} id={event.id} day={event.date} order={event.order}>
                            <EventCard title={event.title} />
                        </Draggable>
                    ))
            ) : (
                <Droppable id={dayId}>
                    <DropAreaStyled />
                </Droppable>
            )}
        </WrapperStyled>
    );
};
