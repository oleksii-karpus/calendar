import { alpha, Box, Container, styled, Typography } from '@mui/material';
import { PriorityStyled as Priority } from '../../components/EventCard/index.styles';

export const WrapperStyled = styled(Box)`
    width: 100%;
    background-color: ${({ theme }) => theme.palette.secondary.main};
    padding: 5px;
    display: flex;
    flex-direction: column;
`;

export const EventListStyled = styled(Container)`
    background-color: ${({ theme }) => theme.palette.common.white};
    flex: 1;
`;

export const EventListItemStyled = styled(Box)`
    border-bottom: 1px solid ${({ theme }) => alpha(theme.palette.text.secondary, 0.3)};
    display: flex;
    padding: 10px 0;
    align-items: center;
    gap: 10px;
    cursor: pointer;
`;

export const DateStyled = styled(Box)`
    font-weight: bold;
    font-size: 14px;
`;

export const PriorityWrapperStyled = styled(Box)`
    padding-left: 10px;
`;

export const PriorityStyled = styled(Priority)`
    width: 15px;
    height: 15px;
    flex: 0 0 15px;
    padding: 0;
`;

export const TitleStyled = styled(Typography)`
    font-weight: bold;
    font-size: 20px;
`;

export const DescriptionStyled = styled(Typography)`
    color: ${({ theme }) => alpha(theme.palette.text.secondary, 0.3)};
    font-size: 18px;
`;

export const NewEventStyled = styled(Box)`
    color: ${({ theme }) => theme.palette.common.white};
    font-size: 20px;
    font-weight: bold;
    border: 1px solid ${({ theme }) => theme.palette.common.white};
    border-radius: 5px;
    display: inline-block;
    padding: 10px 20px;
    margin: 10px 0;
    cursor: pointer;
`;
