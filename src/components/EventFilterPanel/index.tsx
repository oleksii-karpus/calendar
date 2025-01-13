import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { alpha, Autocomplete, Box, InputBase, styled, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useCountry } from '../../hooks/use.country';
import { Country } from '../../common/types/country';
import { ControlStyled, DateNavigatorStyled, TitleStyled, WrapperStyled } from './index.styles';
const Search = styled('div')(({ theme }) => ({
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

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
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

type Props = {
    label: string;
    onPrev: () => void;
    onNext: () => void;
    className?: string;
    disableDateNavigator?: boolean;
    onSearchChange?: (value: string) => void;
    searchQuery?: string;
};

export const EventFilterPanel = ({
    label,
    onPrev,
    onNext,
    className,
    disableDateNavigator = false,
    onSearchChange = () => {},
    searchQuery = ''
}: Props) => {
    const { currentCountry, countries, updateCountryCode } = useCountry();
    const [country, setCountry] = useState<Country | null>(currentCountry);

    useEffect(() => {
        setCountry(currentCountry);
    }, [currentCountry]);

    const handleCountryChange = (newCountry: Country | null) => {
        setCountry(newCountry);
        updateCountryCode(newCountry);
    };

    return (
        <WrapperStyled className={className}>
            <Box style={{ flex: '1 1 20%' }}>
                <Autocomplete
                    id="country-select-demo"
                    value={country}
                    onChange={(_, value) => handleCountryChange(value)}
                    sx={{ width: '100%', maxWidth: '250px' }}
                    options={countries}
                    autoHighlight
                    getOptionLabel={option => option.name}
                    renderOption={(props, option) => {
                        const { key, ...optionProps } = props;
                        return (
                            <Box key={key} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...optionProps}>
                                {option.name}
                            </Box>
                        );
                    }}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label="country"
                            slotProps={{
                                htmlInput: {
                                    ...params.inputProps
                                }
                            }}
                        />
                    )}
                />
            </Box>
            {!disableDateNavigator && (
                <DateNavigatorStyled style={{ flex: '1 1 60%' }}>
                    <ControlStyled onClick={onPrev}>
                        <ChevronLeftIcon />
                    </ControlStyled>
                    <TitleStyled variant="h4">{label}</TitleStyled>
                    <ControlStyled onClick={onNext}>
                        <ChevronRightIcon />
                    </ControlStyled>
                </DateNavigatorStyled>
            )}
            <Box style={{ flex: '1 1 20%' }}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        value={searchQuery}
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={event => onSearchChange(event.target.value)}
                    />
                </Search>
            </Box>
        </WrapperStyled>
    );
};
