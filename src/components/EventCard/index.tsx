import { EventPriority } from '../../common/types/event';
import { HeadingStyled, HeadingWrapperStyled, PriorityStyled, WrapperStyled } from './index.styles';

type Props = {
    title: string;
    global?: boolean;
    priority?: EventPriority;
    hidden?: boolean;
};
export const EventCard = ({ title, global = false, priority, hidden }: Props) => {
    return (
        <WrapperStyled $global={global} $hidden={hidden}>
            <HeadingWrapperStyled>
                {!global && <PriorityStyled $priority={priority} />}
                <HeadingStyled variant="h4" $global={global}>
                    {title}
                </HeadingStyled>
            </HeadingWrapperStyled>
        </WrapperStyled>
    );
};
