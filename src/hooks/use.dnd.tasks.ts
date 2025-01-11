import { useState } from 'react';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { Task } from '../common/types/task';
import { DragItemData } from '../common/types/drag.item.data';
import { moveTaskToEmptyDay, reorderOrMoveTask } from '../utils/task.dnd.operations';

const exampleTasks: Task[] = [
    {
        id: '1',
        title: 'Meeting',
        description: 'Team meeting at 10am',
        priority: 'high',
        order: 1,
        date: '2025-01-01'
    },
    { id: '2', title: 'Presentation', description: 'Prepare slides', priority: 'medium', order: 2, date: '2025-01-01' },
    {
        id: '3',
        title: 'Global',
        description: 'Morning gym session',
        priority: 'low',
        order: 1,
        date: '2025-01-05'
    },
    {
        id: '4',
        title: 'Global event',
        description: 'Global event',
        order: 0,
        date: '2025-01-01',
        global: true
    }
];

export const useDndTasks = () => {
    const [tasks, setTasks] = useState<Task[]>(exampleTasks);
    const [draggedTask, setDraggedTask] = useState<Task | null>(null);

    const handleDragStart = (event: DragStartEvent) => {
        const activeTaskId = String(event.active.id);
        const task = tasks.find(t => t.id === activeTaskId);
        if (task) {
            setDraggedTask(task);
        }
    };

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        setDraggedTask(null);
        if (!over || !active?.data?.current) return;

        const activeTask = active.data.current as DragItemData;
        const activeTaskId = String(active.id);
        const targetTask = over.data.current as DragItemData;
        const targetDayId = String(over.id);
        setTasks(prevTasks => {
            if (!targetTask) {
                return prevTasks.map(task => moveTaskToEmptyDay(task, activeTaskId, activeTask, targetDayId).task);
            }
            return prevTasks.map(task => reorderOrMoveTask(task, targetTask, activeTask).task);
        });
    };

    return {
        tasks,
        setTasks,
        draggedTask,
        handleDragStart,
        handleDragEnd
    };
};
