import { Controller, useForm } from 'react-hook-form';
import { Button, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Event, isEvent, isNewEvent, NewEvent } from '../../../../common/types/event';
import {
    ButtonWrapperStyled,
    FormControlStyled,
    FormItemStyled,
    FormStyled,
    LabelStyled,
    LabelWrapperStyled,
    WrapperStyled,
    FormHeadingStyled
} from './index.styles';

type EventFormData = Partial<Event> & NewEvent;

interface EventFormProps {
    event: EventFormData;
    onUpdate?: (data: Event) => void;
    onCreate?: (data: NewEvent) => void;
    onDelete?: (id: string) => void;
}

export const EventForm = ({ event, onDelete, onUpdate = () => {}, onCreate = () => {} }: EventFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm<EventFormData>({
        defaultValues: event
    });

    const onSubmit = (data: EventFormData) => {
        if (isEvent(data)) {
            onUpdate(data);
        } else if (isNewEvent(data)) {
            onCreate(data);
        }
    };

    const handleReset = () => reset(event);

    const handleOnDelete = () => {
        if (event.id && onDelete) {
            const isConfirmed = window.confirm('Are you sure you want to delete this event?');
            if (isConfirmed) {
                onDelete(event.id);
            }
        }
    };

    return (
        <WrapperStyled>
            <FormStyled onSubmit={handleSubmit(onSubmit)}>
                {event.id && onDelete && (
                    <FormHeadingStyled>
                        <IconButton aria-label="delete" size="small" onClick={handleOnDelete}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </FormHeadingStyled>
                )}
                <FormItemStyled>
                    <LabelWrapperStyled>
                        <LabelStyled>Title</LabelStyled>
                        <TextField
                            {...register('title', { required: 'Title is required' })}
                            placeholder="Enter event title"
                        />
                    </LabelWrapperStyled>
                    {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
                </FormItemStyled>
                <FormItemStyled>
                    <LabelWrapperStyled>
                        <LabelStyled>Description</LabelStyled>
                        <TextField multiline rows={3} {...register('description')} placeholder="Enter description" />
                    </LabelWrapperStyled>
                </FormItemStyled>
                <FormItemStyled>
                    <FormControlStyled>
                        <InputLabel id="select-priority-label">Priority</InputLabel>
                        <Controller
                            name="priority"
                            control={control}
                            render={({ field }) => (
                                <Select {...field} labelId="select-priority-label" fullWidth>
                                    <MenuItem value="low">Low</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="high">High</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControlStyled>
                </FormItemStyled>
                <FormItemStyled>
                    <LabelWrapperStyled>
                        <LabelStyled>Date</LabelStyled>
                        <TextField
                            type="date"
                            {...register('date', { required: 'Date is required' })}
                            placeholder="YYYY-MM-DD"
                        />
                    </LabelWrapperStyled>
                    {errors.date && <p style={{ color: 'red' }}>{errors.date.message}</p>}
                </FormItemStyled>
                <FormItemStyled>
                    <ButtonWrapperStyled>
                        <Button variant="contained" type="submit">
                            Save
                        </Button>
                        <Button color="secondary" onClick={handleReset}>
                            Reset
                        </Button>
                    </ButtonWrapperStyled>
                </FormItemStyled>
            </FormStyled>
        </WrapperStyled>
    );
};
