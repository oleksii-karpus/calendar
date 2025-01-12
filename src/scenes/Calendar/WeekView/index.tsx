import React from 'react';
import { pointerWithin, DndContext, DragOverlay } from '@dnd-kit/core';
import { getWeekDays } from '../../../utils/date.utils';
import { DateNavigator } from '../components/DateNavigator';
import { WrapperStyled } from '../index.styles';
import { DateFormats } from '../../../common/enums/date.formats';
import { EventCard } from '../components/EventCard';
import { DayCell } from '../components/DayCell';
import { useDndSensors } from '../../../hooks/use.dnd.sensors';
import { useDndEvents } from '../../../hooks/use.dnd.events';
import { useDateManager } from '../../../hooks/use.date.manager';
import { WeekWrapperStyled } from './index.styles';

const WeekView: React.FC = () => {
    const { events, draggedEvent, handleDragStart, handleDragEnd } = useDndEvents();
    const sensors = useDndSensors();
    const { currentWeekStart, updateDate } = useDateManager();

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
            <DateNavigator
                label={`${currentWeekStart.format(DateFormats.shortDate)} - ${currentWeekStart
                    .add(6, 'day')
                    .format(DateFormats.fullDate)}`}
                onPrev={handlePrevWeek}
                onNext={handleNextWeek}
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
