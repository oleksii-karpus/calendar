import React, { useState } from 'react';
import dayjs from 'dayjs';
import { getMonthDays, getWeekdayLabels } from '../../../utils/date.utils';
import { DateNavigator } from '../components/DateNavigator';
import { WrapperStyled } from '../index.styles';
import { DateFormats } from '../../../common/enums/date.formats';
import { DayCellStyled, DaysGridStyled, DaysGridWrapperStyled, WeekdayCellStyled } from './index.styles';

const weekdays = getWeekdayLabels();

const MonthView: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(dayjs());

    const year = currentDate.year();
    const month = currentDate.month();
    const days = getMonthDays(year, month);

    const handlePrevMonth = () => {
        setCurrentDate(currentDate.subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        setCurrentDate(currentDate.add(1, 'month'));
    };

    return (
        <WrapperStyled>
            <DateNavigator
                label={currentDate.format(DateFormats.monthYear)}
                onPrev={handlePrevMonth}
                onNext={handleNextMonth}
            />
            <DaysGridWrapperStyled>
                <DaysGridStyled>
                    {weekdays.map(day => (
                        <WeekdayCellStyled key={day}>{day}</WeekdayCellStyled>
                    ))}
                    {days.map(({ date, isCurrentMonth }, index) => (
                        <DayCellStyled isCurrentMonth={isCurrentMonth} key={index}>
                            {date.date()}
                        </DayCellStyled>
                    ))}
                </DaysGridStyled>
            </DaysGridWrapperStyled>
        </WrapperStyled>
    );
};

export default MonthView;
