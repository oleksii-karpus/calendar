import { AppBar, Box, Toolbar } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Routes } from '../../../common/enums/routes';
import { LogoWrapper, NavItemLinkStyled, NavStyled } from './index.styles';

const navItems = [
    { label: 'Events', route: Routes.events },
    { label: 'Month', route: Routes.month },
    { label: 'Week', route: Routes.week }
];

export const Header = () => {
    const location = useLocation();
    const isActive = (route: Routes): boolean => {
        return location.pathname.startsWith(route);
    };
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <LogoWrapper>
                        <NavItemLinkStyled to={Routes.baseUrl}>Calendar</NavItemLinkStyled>
                    </LogoWrapper>
                    <NavStyled>
                        {navItems.map(item => (
                            <NavItemLinkStyled key={item.route} to={item.route} isActive={isActive(item.route)}>
                                {item.label}
                            </NavItemLinkStyled>
                        ))}
                    </NavStyled>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
