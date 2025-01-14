import { Fragment, useState } from 'react';
import dayjs from 'dayjs';
import { Container } from '@mui/material';
import { useFilteredEvents } from '../../hooks/use.filtered.events';
import { EventFilterPanel } from '../../components/EventFilterPanel';
import { DateFormats } from '../../common/enums/date.formats';
import { useEventPopover } from '../../hooks/use.event.popover';
import {
    DateStyled,
    EventListItemStyled,
    EventListStyled,
    TitleStyled,
    WrapperStyled,
    PriorityStyled,
    PriorityWrapperStyled,
    DescriptionStyled,
    NewEventStyled
} from './index.styles';
import { EventPopover } from './EventPopover';

const Events = () => {
    const [searchString, setSearchString] = useState('');
    const { events } = useFilteredEvents(searchString);
    const allEvents = [...events.publicHolidays, ...events.userEvents].sort(
        (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
    );

    const {
        anchorEl,
        popoverData,
        mode,
        handleEventClick,
        handleClose,
        handleCreateClick,
        refElement: addRef
    } = useEventPopover();

    return (
        <WrapperStyled>
            <EventFilterPanel
                searchQuery={searchString}
                onSearchChange={query => setSearchString(query)}
                disableDateNavigator
            />
            <Container>
                <NewEventStyled
                    role="presentation"
                    onClick={() =>
                        handleCreateClick({
                            date: dayjs().format('YYYY-MM-DD'),
                            description: '',
                            order: events.userEvents.length + 1,
                            priority: 'medium',
                            title: 'New Event'
                        })
                    }
                    ref={addRef}
                >
                    Add New Event
                </NewEventStyled>
            </Container>
            <EventListStyled>
                {allEvents.map(event => (
                    <Fragment key={event.id}>
                        {!event.hidden && (
                            <EventListItemStyled onClick={e => handleEventClick(e, event)}>
                                <DateStyled>{dayjs(event.date).format(DateFormats.fullDate)}</DateStyled>
                                <PriorityWrapperStyled>
                                    <PriorityStyled $priority={event.priority} />
                                </PriorityWrapperStyled>
                                <TitleStyled variant="h2">{event.title}</TitleStyled>
                                <DescriptionStyled>{event.description || 'Public Holiday'}</DescriptionStyled>
                            </EventListItemStyled>
                        )}
                    </Fragment>
                ))}
                <EventPopover
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    mode={mode}
                    event={popoverData}
                />
            </EventListStyled>
        </WrapperStyled>
    );
};

export default Events;
