type HolidayTypes = 'Public' | 'Bank' | 'School' | 'Authorities' | 'Optional' | 'Observance';

export interface PublicHolidaysDto {
    date: string;
    localName: string;
    name: string;
    countryCode: string;
    global: boolean;
    counties: string[];
    launchYear: number;
    types: HolidayTypes[];
}
