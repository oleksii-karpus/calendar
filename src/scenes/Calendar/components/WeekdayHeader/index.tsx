import { WeekdayCellStyled } from './index.styles';

type Props = {
    weekdays: string[];
};

export const WeekdayHeader = ({ weekdays }: Props) => (
    <>
        {weekdays.map(weekday => (
            <WeekdayCellStyled key={weekday}>{weekday}</WeekdayCellStyled>
        ))}
    </>
);
