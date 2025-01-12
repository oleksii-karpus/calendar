import { FC } from 'react';
import { Event } from '../../../../common/types/event';

export const ViewEvent: FC<{ event: Event }> = ({ event }) => {
    return (
        <div style={{ padding: '16px', minWidth: '200px' }}>
            {event.global && <p>Global</p>}
            <p>{event.date}</p>
            <p>{event.title}</p>
            {event.description && <p>{event.description}</p>}
        </div>
    );
};
