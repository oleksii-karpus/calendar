import React, { useState } from 'react';
import dayjs from 'dayjs';
import { pointerWithin, DndContext, DragOverlay } from '@dnd-kit/core';
import { getWeekDays } from '../../../utils/date.utils';
import { DateNavigator } from '../components/DateNavigator';
import { WrapperStyled } from '../index.styles';
import { DateFormats } from '../../../common/enums/date.formats';
import { useDndTasks } from '../../../hooks/use.dnd.tasks';
import { TaskCard } from '../components/TaskCard';
import { DayCell } from '../components/DayCell';
import { useDndSensors } from '../../../hooks/use.dnd.sensors';
import { WeekWrapperStyled } from './index.styles';

const WeekView: React.FC = () => {
    const [currentWeekStart, setCurrentWeekStart] = useState(dayjs().startOf('week').add(1, 'day'));
    const { tasks, draggedTask, handleDragStart, handleDragEnd } = useDndTasks();
    const sensors = useDndSensors();

    const handlePrevWeek = () => {
        setCurrentWeekStart(currentWeekStart.subtract(1, 'week'));
    };

    const handleNextWeek = () => {
        setCurrentWeekStart(currentWeekStart.add(1, 'week'));
    };

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
                        const currentDayTasks = tasks.filter(task => task.date === dayId);

                        return <DayCell key={dayId} dayId={dayId} dayNumber={day.date()} tasks={currentDayTasks} />;
                    })}
                </WeekWrapperStyled>
                <DragOverlay>{draggedTask ? <TaskCard title={draggedTask.title} /> : null}</DragOverlay>
            </DndContext>
        </WrapperStyled>
    );
};

export default WeekView;
