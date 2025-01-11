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
