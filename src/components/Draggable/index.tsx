import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FC, ReactNode } from 'react';
import { WrapperStyled } from './index.styles';

type Props = {
    id: string;
    children: ReactNode;
    day: string;
    order: number;
};

export const Draggable: FC<Props> = ({ id, children, day, order }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isOver } = useSortable({
        id,
        data: { id, day, order }
    });

    return (
        <WrapperStyled
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            $transform={CSS.Transform.toString(transform)}
            $transition={transition}
            isOver={isOver}
        >
            {children}
        </WrapperStyled>
    );
};