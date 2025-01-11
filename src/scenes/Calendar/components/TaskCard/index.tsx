import { HeadingStyled, WrapperStyled } from './index.styles';

type Props = {
    title: string;
};
export const TaskCard = ({ title }: Props) => {
    return (
        <WrapperStyled>
            <HeadingStyled variant="h4">{title}</HeadingStyled>
        </WrapperStyled>
    );
};
