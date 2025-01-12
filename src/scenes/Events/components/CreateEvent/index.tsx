import { useForm } from 'react-hook-form';
import { NewEvent } from '../../../../common/types/event';

interface CreateEventProps {
    event: NewEvent;
    onSave: (updatedEvent: NewEvent) => void;
}

export const CreateEvent = ({ event, onSave }: CreateEventProps) => {
    const { register, handleSubmit, reset } = useForm<NewEvent>({
        defaultValues: event
    });

    const onSubmit = (data: NewEvent) => {
        onSave(data);
    };

    const handleReset = () => {
        reset(event);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '16px', minWidth: '200px' }}>
            <h3>Create New Event</h3>
            <div>
                <label htmlFor="title">Title:</label>
                <input id="title" {...register('title', { required: 'Title is required' })} />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea id="description" {...register('description')} />
            </div>
            <div>
                <label htmlFor="priority">Priority:</label>
                <select id="priority" {...register('priority')}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div>
                <label htmlFor="date">Date:</label>
                <input id="date" type="date" {...register('date')} />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={handleReset}>
                Reset
            </button>{' '}
            {/* Кнопка для сброса */}
        </form>
    );
};
