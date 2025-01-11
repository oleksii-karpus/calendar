import React, { useState } from 'react';
import dayjs from 'dayjs';
import { pointerWithin, DndContext, DragOverlay } from '@dnd-kit/core';
import { getMonthDays, getWeekdayLabels } from '../../../utils/date.utils';
import { DateNavigator } from '../components/DateNavigator';
import { WrapperStyled } from '../index.styles';
import { DateFormats } from '../../../common/enums/date.formats';

import { useDndTasks } from '../../../hooks/use.dnd.tasks';
import { TaskCard } from '../components/TaskCard';
import { WeekdayHeader } from '../components/WeekdayHeader';
import { useDndSensors } from '../../../hooks/use.dnd.sensors';
import { DayCellStyled, DaysGridStyled, DaysGridWrapperStyled } from './index.styles';

const weekdays = getWeekdayLabels();

const MonthView: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const { tasks, draggedTask, handleDragStart, handleDragEnd } = useDndTasks();
    const sensors = useDndSensors();

    const year = currentDate.year();
    const month = currentDate.month();
    const days = getMonthDays(year, month);

    const handlePrevMonth = () => {
        setCurrentDate(currentDate.subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        setCurrentDate(currentDate.add(1, 'month'));
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
                            const currentDayTasks = tasks.filter(task => task.date === dayId);
                            return (
                                <DayCellStyled
                                    key={dayId}
                                    dayId={dayId}
                                    isCurrentMonth={isCurrentMonth}
                                    dayNumber={date.date()}
                                    tasks={currentDayTasks}
                                />
                            );
                        })}
                    </DaysGridStyled>
                    <DragOverlay>{draggedTask ? <TaskCard title={draggedTask.title} /> : null}</DragOverlay>
                </DndContext>
            </DaysGridWrapperStyled>
        </WrapperStyled>
    );
};

export default MonthView;
