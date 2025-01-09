import React, { useState } from 'react';
import dayjs from 'dayjs';
import { getWeekDays } from '../../../utils/date.utils';
import { DateNavigator } from '../components/DateNavigator';
import { DayCellStyled, WrapperStyled } from '../index.styles';
import { DateFormats } from '../../../common/enums/date.formats';
import { WeekWrapperStyled } from './index.styles';

const WeekView: React.FC = () => {
    const [currentWeekStart, setCurrentWeekStart] = useState(dayjs().startOf('week').add(1, 'day'));

    const handlePrevWeek = () => {
        setCurrentWeekStart(currentWeekStart.subtract(1, 'week'));
    };

    const handleNextWeek = () => {
        setCurrentWeekStart(currentWeekStart.add(1, 'week'));
    };

    const weekDays = getWeekDays(currentWeekStart);

    return (
        <WrapperStyled>
            <DateNavigator
                label={`${currentWeekStart.format(DateFormats.shortDate)} - ${currentWeekStart.add(6, 'day').format(DateFormats.fullDate)}`}
                onPrev={handlePrevWeek}
                onNext={handleNextWeek}
            />
            <WeekWrapperStyled>
                {weekDays.map((day, index) => (
                    <DayCellStyled key={index}>
                        <h4>{day.format(DateFormats.fullDayName)}</h4>
                        <p>{day.format(DateFormats.shortDate)}</p>
                    </DayCellStyled>
                ))}
            </WeekWrapperStyled>
        </WrapperStyled>
    );
};

export default WeekView;
