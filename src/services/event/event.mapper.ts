import { Event } from '../../common/types/event';
import { generateUUIDv5 } from '../../utils/uuid.utils';
import { PublicHolidaysDto } from './dto/public.holidays.dto';

class EventMapper {
    mapPublicHolidayDtoToEvent(dto: PublicHolidaysDto): Event {
        return {
            id: generateUUIDv5(`${dto.date}-${dto.name}-${dto.countryCode}`),
            title: dto.name,
            order: 0,
            date: dto.date,
            global: true
        };
    }
}

export const eventMapper = new EventMapper();
