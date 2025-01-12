import { NewEvent, Event, isEvent, isNewEvent, EventPopoverMode } from '../../../common/types/event';
import { ViewEvent } from '../components/ViewEvent';
import { EditEvent } from '../components/EditEvent';
import { CreateEvent } from '../components/CreateEvent';

type Props = {
    mode: EventPopoverMode;
    event: NewEvent | Event;
    onUpdate: (data: Event) => void;
    onCreate: (data: NewEvent) => void;
    onDelete: (id: string) => void;
};

export const eventPopoverFactory = ({ mode, event, onUpdate, onCreate, onDelete }: Props) => {
    switch (mode) {
        case 'create':
            if (isNewEvent(event)) {
                return <CreateEvent event={event} onSave={onCreate} />;
            }
            return null;
        case 'edit':
            if (isEvent(event)) {
                return <EditEvent event={event} onSave={onUpdate} onDelete={onDelete} />;
            }
            return null;
        case 'view':
        default:
            if (isEvent(event)) {
                return <ViewEvent event={event} />;
            }
            return null;
    }
};
