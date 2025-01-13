import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useCountry } from '../../hooks/use.country';
import { Country } from '../../common/types/country';
import {
    ControlStyled,
    DateNavigatorStyled,
    SearchWrapperStyled,
    TitleStyled,
    WrapperStyled,
    SearchStyled,
    InputBaseStyled,
    SearchIconWrapperStyled,
    InputAdornmentStyled,
    CountryInputStyled,
    CountrySelectStyled,
    CountrySelectWrapperStyled
} from './index.styles';

type Props = {
    label?: string;
    onPrev?: () => void;
    onNext?: () => void;
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
            <CountrySelectWrapperStyled>
                <CountrySelectStyled
                    id="country-select-demo"
                    value={country}
                    onChange={(_, value) => handleCountryChange(value)}
                    options={countries}
                    autoHighlight
                    getOptionLabel={option => option.name}
                    renderOption={(props, option) => {
                        const { key, ...optionProps } = props;
                        return (
                            <Box key={key} component="li" {...optionProps}>
                                {option.name}
                            </Box>
                        );
                    }}
                    renderInput={params => (
                        <CountryInputStyled
                            {...params}
                            slotProps={{
                                htmlInput: {
                                    ...params.inputProps
                                }
                            }}
                        />
                    )}
                />
            </CountrySelectWrapperStyled>
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
            <SearchWrapperStyled>
                <SearchStyled>
                    <SearchIconWrapperStyled>
                        <SearchIcon />
                    </SearchIconWrapperStyled>
                    <InputBaseStyled
                        value={searchQuery}
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={event => onSearchChange(event.target.value)}
                        endAdornment={
                            searchQuery && (
                                <InputAdornmentStyled position="end">
                                    <IconButton onClick={() => onSearchChange('')} edge="end">
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornmentStyled>
                            )
                        }
                    />
                </SearchStyled>
            </SearchWrapperStyled>
        </WrapperStyled>
    );
};
