import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FC, ReactNode, MouseEvent } from 'react';
import { Event } from '../../common/types/event';
import { WrapperStyled } from './index.styles';

type Props = {
    children: ReactNode;
    onClick: (event: MouseEvent<HTMLElement>, id: string) => void;
    userEvent: Event;
};

export const Draggable: FC<Props> = ({ children, onClick, userEvent }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isOver, isDragging } = useSortable({
        id: userEvent.id,
        data: userEvent
    });

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        onClick(event, userEvent.id);
    };

    return (
        <WrapperStyled
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            $transform={CSS.Transform.toString(transform)}
            $transition={transition}
            $isOver={isOver}
            $isDragging={isDragging}
            onClick={handleClick}
        >
            {children}
        </WrapperStyled>
    );
};
