import { Box, styled } from '@mui/material';

export const WrapperStyled = styled(Box)`
    display: flex;
    width: 100%;
    min-height: 100%;
    flex-flow: column wrap;
    box-sizing: border-box;
    flex: auto;
`;

export const ContentWrapperStyled = styled(Box)`
    height: 100%;
    width: 100%;
    display: flex;
    flex: 1 1 auto;
`;
