import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FC, ReactNode, MouseEvent } from 'react';
import { WrapperStyled } from './index.styles';

type Props = {
    id: string;
    children: ReactNode;
    day: string;
    order: number;
    onClick: (event: MouseEvent<HTMLElement>, id: string) => void;
};

export const Draggable: FC<Props> = ({ id, children, day, order, onClick }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isOver } = useSortable({
        id,
        data: { id, day, order }
    });

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        onClick(event, id);
    };

    return (
        <WrapperStyled
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            $transform={CSS.Transform.toString(transform)}
            $transition={transition}
            $isOver={isOver}
            onClick={handleClick}
        >
            {children}
        </WrapperStyled>
    );
};
