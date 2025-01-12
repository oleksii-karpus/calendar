import { useForm } from 'react-hook-form';
import { Event } from '../../../../common/types/event';

interface EditEventProps {
    event: Event;
    onSave: (updatedEvent: Event) => void;
    onDelete: (id: string) => void;
}

export const EditEvent = ({ event, onSave, onDelete }: EditEventProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Event>({
        defaultValues: event
    });

    const onSubmit = (data: Event) => {
        onSave(data);
    };

    const handleReset = () => {
        reset(event);
    };

    const handleOnDelete = (id: string) => {
        onDelete(id);
    };

    return (
        <div>
            <button type="button" onClick={() => handleOnDelete(event.id)} />
            <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '16px', minWidth: '200px' }}>
                <h3>Edit Event</h3>
                <div>
                    <label>
                        Title:
                        <input {...register('title', { required: 'Title is required' })} />
                    </label>
                    {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
                </div>
                <div>
                    <label>
                        Description:
                        <textarea {...register('description')} />
                    </label>
                </div>
                <div>
                    <label>
                        Priority:
                        <select {...register('priority')}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Date:
                        <input type="date" {...register('date', { required: 'Date is required' })} />
                    </label>
                    {errors.date && <p style={{ color: 'red' }}>{errors.date.message}</p>}
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={handleReset}>
                    Reset
                </button>
            </form>
        </div>
    );
};
