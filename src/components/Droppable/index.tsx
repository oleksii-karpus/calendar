import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { WrapperStyled } from './index.styles';

type Props = {
    id: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
};

export const Droppable: React.FC<Props> = ({ id, children }) => {
    const { setNodeRef, isOver } = useDroppable({
        id
    });

    return (
        <WrapperStyled ref={setNodeRef} $isOver={isOver}>
            {children}
        </WrapperStyled>
    );
};
