import { Box, BoxProps, styled } from '@mui/material';
import { DayCell, DayCellProps } from '../components/DayCell';

export const DaysGridWrapperStyled = styled(Box)`
    display: flex;
    flex: 1 1 auto;
    width: 100%;
`;

export const DaysGridStyled = styled(Box)`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    width: 100%;
    height: 100%;
    align-content: start;
`;

export const DayCellStyled = styled(
    (props: { isCurrentMonth: boolean } & BoxProps & DayCellProps) => <DayCell {...props} />,
    {
        shouldForwardProp: prop => prop !== 'isCurrentMonth'
    }
)`
    opacity: ${({ isCurrentMonth }) => (isCurrentMonth ? '1' : '0.7')};
    height: 150px;
`;
