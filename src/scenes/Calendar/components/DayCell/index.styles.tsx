import { Box, styled } from '@mui/material';

export const WrapperStyled = styled(Box)`
    padding: 10px;
    background-color: ${({ theme }) => theme.palette.common.white};
    border-radius: 5px;
    text-align: center;
    color: ${({ theme }) => theme.palette.common.black};
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
`;

export const DropAreaStyled = styled(Box)`
    border-radius: 4px;
    height: 100%;
    cursor: pointer;
`;

export const DayHeaderStyled = styled(Box)`
    display: flex;
    cursor: pointer;
    align-items: flex-end;
    margin-bottom: 5px;
    justify-content: space-between;
`;

export const DayNumberStyled = styled(Box)`
    font-weight: bold;
    font-size: 24px;
    display: flex;
    margin: 0;
    line-height: 1;
`;

export const CardsCountStyled = styled(Box)`
    font-size: 14px;
    opacity: 0.7;
`;
