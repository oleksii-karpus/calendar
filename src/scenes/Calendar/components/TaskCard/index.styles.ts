import { Box, styled, Typography } from '@mui/material';

export const WrapperStyled = styled(Box)`
    padding: 2px;
    border-radius: 4px;
    margin-bottom: 5px;
    transition: transform 0.2s ease;
    border: 1px solid ${({ theme }) => theme.palette.primary.main};
    color: black;
    text-align: left;
    background-color: #cecece;
`;

export const HeadingStyled = styled(Typography)`
    font-weight: bold;
    font-size: 12px;
    margin: 2px;
`;
