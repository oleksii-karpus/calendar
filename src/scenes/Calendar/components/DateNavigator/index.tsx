import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ControlStyled, TitleStyled, WrapperStyled } from './index.styles';

type Props = {
    label: string;
    onPrev: () => void;
    onNext: () => void;
    className?: string;
};

export const DateNavigator = ({ label, onPrev, onNext, className }: Props) => {
    return (
        <WrapperStyled className={className}>
            <ControlStyled onClick={onPrev}>
                <ChevronLeftIcon />
            </ControlStyled>
            <TitleStyled variant="h4">{label}</TitleStyled>
            <ControlStyled onClick={onNext}>
                <ChevronRightIcon />
            </ControlStyled>
        </WrapperStyled>
    );
};
