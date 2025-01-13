import { alpha, Box, styled, Typography } from '@mui/material';
import { green, red, teal, yellow } from '@mui/material/colors';
import { EventPriority } from '../../common/types/event';

const priorityColors = {
    high: red[500],
    medium: yellow[500],
    low: green[500]
};

export const WrapperStyled = styled(Box, {
    shouldForwardProp: (prop: string) => !['$global', '$hidden'].includes(prop)
})<{ $global: boolean; $hidden?: boolean }>`
    padding: 2px;
    border-radius: 4px;
    margin-bottom: 5px;
    transition: transform 0.2s ease;
    background-color: ${({ $global }) => ($global ? teal['A700'] : 'transparent')};
    color: ${({ $global, theme }) => ($global ? theme.palette.common.white : theme.palette.common.black)};
    opacity: ${({ $hidden }) => ($hidden ? '0.2' : '1')};
`;

export const HeadingWrapperStyled = styled(Box)`
    display: flex;
    align-items: center;
    width: 100%;
`;
export const HeadingStyled = styled(Typography, {
    shouldForwardProp: (prop: string) => prop !== '$global'
})<{ $global?: boolean }>`
    width: 100%;
    font-weight: bold;
    font-size: 14px;
    margin: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: ${({ $global }) => ($global ? 'center' : 'left')};
    padding: 4px;
    border-radius: 4px;
    &:hover {
        background-color: ${({ $global, theme }) => (!$global ? alpha(theme.palette.common.black, 0.05) : 'inherit')};
    }
`;

export const PriorityStyled = styled(Box, {
    shouldForwardProp: prop => prop !== '$priority'
})<{ $priority?: EventPriority }>`
    display: block;
    border-radius: 50%;
    background-color: ${({ $priority }) => ($priority ? priorityColors[$priority] : 'transparent')};
    width: 8px;
    height: 8px;
    flex: 0 0 8px;
    margin: 0 5px 1px 0;
`;
