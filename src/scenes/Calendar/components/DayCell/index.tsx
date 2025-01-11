import { FC } from 'react';
import { Draggable } from '../../../../components/Draggable';
import { TaskCard } from '../TaskCard';
import { Droppable } from '../../../../components/Droppable';
import { Task } from '../../../../common/types/task';
import { DropAreaStyled, WrapperStyled } from './index.styles';

export interface DayCellProps {
    dayId: string;
    dayNumber: number;
    tasks: Task[];
    className?: string;
}

export const DayCell: FC<DayCellProps> = ({ dayId, dayNumber, tasks, className }) => {
    const globalTasks = tasks.filter(task => task.global);
    const localTasks = tasks.filter(task => !task.global);

    return (
        <WrapperStyled key={dayId} className={className}>
            <div>
                {dayNumber} {tasks.length > 0 && `${tasks.length} cards`}
            </div>
            {globalTasks.map(task => (
                <TaskCard key={task.id} title={task.title} />
            ))}
            {localTasks.length > 0 ? (
                localTasks
                    .sort((a, b) => a.order - b.order)
                    .map(task => (
                        <Draggable key={task.id} id={task.id} day={task.date} order={task.order}>
                            <TaskCard title={task.title} />
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
