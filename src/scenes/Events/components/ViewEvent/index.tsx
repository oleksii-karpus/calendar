import { FC } from 'react';
import { Typography } from '@mui/material';
import { Event } from '../../../../common/types/event';
import { FormItemStyled, LabelStyled, WrapperStyled } from '../EventForm/index.styles';

export const ViewEvent: FC<{ event: Event }> = ({ event }) => {
    return (
        <WrapperStyled>
            {event.global && (
                <FormItemStyled>
                    <LabelStyled>Public Holiday</LabelStyled>
                </FormItemStyled>
            )}
            <FormItemStyled>
                <LabelStyled>Title</LabelStyled>
                <Typography variant="body2">{event.title}</Typography>
            </FormItemStyled>
            {event.description && (
                <FormItemStyled>
                    <LabelStyled>Description</LabelStyled>
                    <Typography variant="body2">{event.description}</Typography>
                </FormItemStyled>
            )}
            <FormItemStyled>
                <LabelStyled>Date</LabelStyled>
                <Typography variant="body2">{event.date}</Typography>
            </FormItemStyled>
        </WrapperStyled>
    );
};
