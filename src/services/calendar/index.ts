import { axiosAdapter } from '../../common/api/axios.adapter';
import { Country } from '../../common/types/country';
import { AppResponse } from '../../common/types/app.response';
import { localStorageService } from '../local-storage';
import { defaultCountryCode } from '../../common/constants/country';

class CalendarService {
    #storageKey = 'country-code';

    async getAvailableCountries(): Promise<AppResponse<Country[]>> {
        const { data } = await axiosAdapter.doGet<Country[]>({
            url: '/v3/AvailableCountries'
        });
        return {
            data
        };
    }

    getCurrentCountryCode(): AppResponse<string> {
        const countryCode = localStorageService.get(this.#storageKey) || defaultCountryCode;
        return {
            data: countryCode
        };
    }

    setCurrentCountryCode(code: string) {
        localStorageService.set(this.#storageKey, code);
    }
}

export const calendarService = new CalendarService();
