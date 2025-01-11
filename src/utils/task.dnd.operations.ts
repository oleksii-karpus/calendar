import { Task } from '../common/types/task';
import { DragItemData } from '../common/types/drag.item.data';

export const reorderOrMoveTask = (task: Task, targetTask: DragItemData, activeTask: DragItemData) => {
    const isTheSameDay = activeTask.day === targetTask.day;
    const prevDate = activeTask.day;
    if ((prevDate !== task.date && targetTask.day !== task.date) || task.global) {
        return {
            isTaskUpdated: false,
            task
        };
    }
    const actions = {
        [targetTask.id]: {
            ...task,
            date: targetTask.day,
            order: isTheSameDay ? activeTask.order : task.order + 1
        },
        [activeTask.id]: {
            ...task,
            date: targetTask.day,
            order: isTheSameDay ? targetTask.order : 1
        },
        default: {
            ...task,
            order: isTheSameDay ? task.order : task.order + 1
        }
    };

    const updatedTask = actions[task.id] || actions.default;
    return {
        isTaskUpdated: true,
        task: updatedTask
    };
};

export const moveTaskToEmptyDay = (task: Task, activeTaskId: string, activeTask: DragItemData, targetDayId: string) => {
    const prevDate = activeTask.day;
    const prevOrder = activeTask.order;
    const isTheSameDay = task.date === targetDayId;
    if ((task.date !== prevDate && !isTheSameDay) || task.global) {
        return {
            isTaskUpdated: false,
            task
        };
    }
    const actions = {
        [activeTaskId]: {
            ...task,
            date: targetDayId,
            order: 1
        },
        default: task.date === prevDate && task.order > prevOrder ? { ...task, order: task.order - 1 } : task
    };

    const actionKey = task.id === activeTaskId ? activeTaskId : 'default';
    const updatedTask = actions[actionKey];
    return {
        isTaskUpdated: true,
        task: updatedTask
    };
};
