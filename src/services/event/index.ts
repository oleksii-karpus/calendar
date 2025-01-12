import { axiosAdapter } from '../../common/api/axios.adapter';
import { PublicHolidaysParams } from '../../scenes/Events/types/public.holidays.params';
import { AppResponse } from '../../common/types/app.response';
import { Event } from '../../common/types/event';
import { PublicHolidaysDto } from './dto/public.holidays.dto';
import { eventMapper } from './event.mapper';

class EventService {
    async getPublicHolidays(payload: PublicHolidaysParams): Promise<AppResponse<Event[]>> {
        const { data } = await axiosAdapter.doGet<PublicHolidaysDto[]>({
            url: `/v3/PublicHolidays/${payload.year}/${payload.countryCode}`
        });

        return { data: data.map(event => eventMapper.mapPublicHolidayDtoToEvent(event)) };
    }
}

export const eventService = new EventService();
