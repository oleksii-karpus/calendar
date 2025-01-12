/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, BoxProps, styled } from '@mui/material';
import { lightBlue } from '@mui/material/colors';

export const WrapperStyled = styled(
    ({
        $transform,
        $transition,
        $isOver,
        ...props
    }: {
        $transform?: string;
        $transition?: string;
        $isOver?: boolean;
    } & BoxProps) => <Box {...props} />
)`
    transform: ${({ $transform }) => $transform || 'none'};
    transition: ${({ $transition }) => $transition || 'none'};
    cursor: grab;
    &:last-child {
        flex: 1;
        background-color: ${({ $isOver }) => ($isOver ? lightBlue[50] : 'transparent')};
        transition: background-color 0.2s ease;
    }
`;
