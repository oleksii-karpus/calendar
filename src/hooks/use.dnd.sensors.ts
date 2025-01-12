import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

export const useDndSensors = () => {
    return useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 150,
                tolerance: 10
            }
        })
    );
};
