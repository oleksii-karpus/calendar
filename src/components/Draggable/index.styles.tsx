import { Box, styled } from '@mui/material';
import { lightBlue } from '@mui/material/colors';

export const WrapperStyled = styled(Box, {
    shouldForwardProp: (prop: string) => !['$transform', '$transition', '$isOver', '$isDragging'].includes(prop)
})<{
    $transform?: string;
    $transition?: string;
    $isOver?: boolean;
    $isDragging?: boolean;
}>`
    transform: ${({ $transform }) => $transform || 'none'};
    transition: ${({ $transition }) => $transition || 'none'};
    cursor: grab;
    opacity: ${({ $isDragging }) => ($isDragging ? '0.5' : '1')};
    &:last-child {
        flex: 1;
        background-color: ${({ $isOver }) => ($isOver ? lightBlue[50] : 'transparent')};
        transition: background-color 0.2s ease;
    }
`;
