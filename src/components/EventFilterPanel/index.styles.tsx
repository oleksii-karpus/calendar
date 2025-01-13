import {
    alpha,
    Autocomplete,
    AutocompleteProps,
    Box,
    Button,
    InputAdornment,
    InputBase,
    styled,
    TextField,
    Typography
} from '@mui/material';
import { Country } from '../../common/types/country';

export const WrapperStyled = styled(Box)`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

export const DateNavigatorStyled = styled(Box)`
    display: flex;
    justify-content: center;
    width: 100%;
`;

export const ControlStyled = styled(Button)`
    margin: 0 15px;
    color: white;
`;

export const TitleStyled = styled(Typography)`
    font-weight: bold;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SearchWrapperStyled = styled(Box)`
    flex: 1 1 20%;
    max-width: 40%;
`;

export const SearchStyled = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto'
    }
}));

export const SearchIconWrapperStyled = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

export const InputBaseStyled = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        [theme.breakpoints.up('sm')]: {
            width: '100%'
        }
    }
}));

export const InputAdornmentStyled = styled(InputAdornment)`
    margin: 0 8px 0 0;
    padding: 0;
    svg {
        color: ${({ theme }) => theme.palette.common.white};
    }
`;

export const CountrySelectWrapperStyled = styled(Box)`
    flex: 1 1 20%;
`;

export const CountrySelectStyled = styled((props: AutocompleteProps<Country, false, false, false>) => (
    <Autocomplete {...props} />
))`
    width: 100%;
    max-width: 250px;
    border: none;
    .MuiInputBase-root {
        padding: ${({ theme }) => theme.spacing(0.2)};
    }
    fieldset {
        border: none;
    }
`;

export const CountryInputStyled = styled(TextField)`
    background: ${({ theme }) => alpha(theme.palette.common.white, 0.15)};
    input {
        color: ${({ theme }) => theme.palette.common.white};
    }
`;
