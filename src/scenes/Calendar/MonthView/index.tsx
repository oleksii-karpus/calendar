import React from 'react';
import { pointerWithin, DndContext, DragOverlay } from '@dnd-kit/core';
import { getMonthDays, getWeekdayLabels } from '../../../utils/date.utils';
import { DateNavigator } from '../components/DateNavigator';
import { WrapperStyled } from '../index.styles';
import { DateFormats } from '../../../common/enums/date.formats';
import { useDndEvents } from '../../../hooks/use.dnd.events';
import { EventCard } from '../components/EventCard';
import { WeekdayHeader } from '../components/WeekdayHeader';
import { useDndSensors } from '../../../hooks/use.dnd.sensors';
import { useDateManager } from '../../../hooks/use.date.manager';
import { DayCellStyled, DaysGridStyled, DaysGridWrapperStyled } from './index.styles';

const weekdays = getWeekdayLabels();

const MonthView: React.FC = () => {
    const { events, draggedEvent, handleDragStart, handleDragEnd } = useDndEvents();
    const sensors = useDndSensors();
    const { currentDate, currentYear, currentMonth, updateDate } = useDateManager();
    const days = getMonthDays(currentYear, currentMonth);
    const handlePrevMonth = () => {
        updateDate(currentDate.subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        updateDate(currentDate.add(1, 'month'));
    };

    return (
        <WrapperStyled>
            <DateNavigator
                label={currentDate.format(DateFormats.monthYear)}
                onPrev={handlePrevMonth}
                onNext={handleNextMonth}
            />
            <DaysGridWrapperStyled>
                <DndContext
                    sensors={sensors}
                    collisionDetection={pointerWithin}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <DaysGridStyled>
                        <WeekdayHeader weekdays={weekdays} />
                        {days.map(({ date, isCurrentMonth }) => {
                            const dayId = date.format(DateFormats.isoDate);
                            const userEvents = events.userEvents.filter(event => event.date === dayId);
                            const publicEvents = events.publicHolidays.filter(event => event.date === dayId);
                            return (
                                <DayCellStyled
                                    key={dayId}
                                    dayId={dayId}
                                    isCurrentMonth={isCurrentMonth}
                                    dayNumber={date.date()}
                                    events={{ publicHolidays: publicEvents, userEvents }}
                                />
                            );
                        })}
                    </DaysGridStyled>
                    <DragOverlay>{draggedEvent ? <EventCard title={draggedEvent.title} /> : null}</DragOverlay>
                </DndContext>
            </DaysGridWrapperStyled>
        </WrapperStyled>
    );
};

export default MonthView;
