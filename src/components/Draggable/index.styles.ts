import { Box, styled } from '@mui/material';
import { lightBlue } from '@mui/material/colors';

export const WrapperStyled = styled(Box)<{ $transform?: string; $transition?: string; isOver?: boolean }>`
    transform: ${({ $transform }) => $transform || 'none'};
    transition: ${({ $transition }) => $transition || 'none'};
    cursor: grab;
    &:last-child {
        flex: 1;
        background-color: ${({ isOver }) => (isOver ? lightBlue[50] : 'transparent')};
        transition: background-color 0.2s ease;
    }
`;
