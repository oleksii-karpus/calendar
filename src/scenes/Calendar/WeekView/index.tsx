import React, { useState } from 'react';
import { pointerWithin, DndContext, DragOverlay } from '@dnd-kit/core';
import { getWeekDays } from '../../../utils/date.utils';
import { EventFilterPanel } from '../../../components/EventFilterPanel';
import { WrapperStyled } from '../index.styles';
import { DateFormats } from '../../../common/enums/date.formats';
import { EventCard } from '../../../components/EventCard';
import { DayCell } from '../components/DayCell';
import { useDndSensors } from '../../../hooks/use.dnd.sensors';
import { useDndHandlers } from '../../../hooks/use.dnd.handlers';
import { useDateManager } from '../../../hooks/use.date.manager';
import { useFilteredEvents } from '../../../hooks/use.filtered.events';
import { WeekWrapperStyled } from './index.styles';

const WeekView: React.FC = () => {
    const { draggedEvent, handleDragStart, handleDragEnd } = useDndHandlers();
    const sensors = useDndSensors();
    const { currentWeekStart, updateDate } = useDateManager();
    const [searchString, setSearchString] = useState('');
    const { events } = useFilteredEvents(searchString);

    const changeWeek = (direction: 'prev' | 'next') => {
        const newWeekStart =
            direction === 'prev' ? currentWeekStart.subtract(1, 'week') : currentWeekStart.add(1, 'week');
        const newWeekEnd = newWeekStart.add(6, 'days');
        const maxDate = currentWeekStart.isAfter(newWeekEnd) ? currentWeekStart : newWeekEnd;
        updateDate(newWeekStart, maxDate);
    };

    const handlePrevWeek = () => changeWeek('prev');

    const handleNextWeek = () => changeWeek('next');

    const weekDays = getWeekDays(currentWeekStart);

    return (
        <WrapperStyled>
            <EventFilterPanel
                label={`${currentWeekStart.format(DateFormats.shortDate)} - ${currentWeekStart
                    .add(6, 'day')
                    .format(DateFormats.fullDate)}`}
                onPrev={handlePrevWeek}
                onNext={handleNextWeek}
                searchQuery={searchString}
                onSearchChange={query => setSearchString(query)}
            />
            <DndContext
                sensors={sensors}
                collisionDetection={pointerWithin}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <WeekWrapperStyled>
                    {weekDays.map(day => {
                        const dayId = day.format(DateFormats.isoDate);
                        const userEvents = events.userEvents.filter(event => event.date === dayId);
                        const publicEvents = events.publicHolidays.filter(event => event.date === dayId);
                        return (
                            <DayCell
                                key={dayId}
                                dayId={dayId}
                                dayNumber={day.date()}
                                events={{ publicHolidays: publicEvents, userEvents }}
                            />
                        );
                    })}
                </WeekWrapperStyled>
                <DragOverlay>{draggedEvent ? <EventCard title={draggedEvent.title} /> : null}</DragOverlay>
            </DndContext>
        </WrapperStyled>
    );
};

export default WeekView;
