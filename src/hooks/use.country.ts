import { useDispatch, useSelector } from 'react-redux';
import { getCalendarState } from '../utils/get.state.utils';
import { RootState } from '../store/types/root.state';
import { Country } from '../common/types/country';
import { AppDispatch } from '../store';
import { updateCountryCodeRoutine } from '../scenes/Calendar/store/routines';

export const useCountry = () => {
    const countryCode = useSelector((rootState: RootState) => getCalendarState(rootState).countryCode);
    const countries = useSelector((rootState: RootState) => getCalendarState(rootState).availableCountries);
    const dispatch: AppDispatch = useDispatch();
    const updateCountryCode = (country: Country | null) => {
        if (!country) {
            return null;
        }
        dispatch(updateCountryCodeRoutine.trigger(country.countryCode));
    };

    return {
        currentCountry: countries.find(country => country.countryCode === countryCode) || null,
        countries,
        updateCountryCode
    };
};
