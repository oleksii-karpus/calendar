import { Box, styled } from '@mui/material';
import Link from '../../../components/Link';
import { LinkType } from '../../../common/types/link.type';

export const LogoWrapper = styled(Box)`
    margin-right: 20px;
`;

export const NavStyled = styled('nav')`
    margin-left: auto;
    display: flex;
    gap: 10px;
`;

export const NavItemLinkStyled = styled(({ ...props }: { isActive?: boolean } & LinkType) => <Link {...props} />)`
    color: ${({ theme }) => theme.palette.common.white};
    padding: 5px 10px;
    text-decoration: none;
    border: 1px solid ${({ isActive, theme }) => (isActive ? theme.palette.common.white : 'transparent')};
    border-radius: 5px;
    font-weight: bold;
    background-color: ${({ isActive, theme }) => (isActive ? theme.palette.secondary.main : 'transparent')};
`;
