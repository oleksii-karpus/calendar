import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { ContentWrapperStyled, WrapperStyled } from './index.styles';

const MainLayout = () => (
    <WrapperStyled>
        <Header />
        <ContentWrapperStyled>
            <Outlet />
        </ContentWrapperStyled>
    </WrapperStyled>
);

export default MainLayout;
