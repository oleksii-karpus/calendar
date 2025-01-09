import { Box, styled } from '@mui/material';

export const WrapperStyled = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    flex-direction: column;
    background-color: ${({ theme }) => theme.palette.secondary.main};
    padding: 5px;
    color: ${({ theme }) => theme.palette.common.white};
`;

export const DayCellStyled = styled(Box)`
    padding: 10px;
    background-color: ${({ theme }) => theme.palette.common.white};
    border-radius: 5px;
    text-align: center;
    color: ${({ theme }) => theme.palette.common.black};
    flex: 1;
`;
