import { createTheme } from '@mui/material';

const defaultTheme = createTheme();
export const theme = createTheme(defaultTheme, {
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    boxSizing: 'border-box'
                },
                html: {
                    height: '100%',
                    width: '100%',
                    fontSize: '100.01%'
                },
                body: {
                    height: '100%',
                    width: '100%',
                    margin: 0
                },
                '#root': {
                    height: '100%',
                    width: '100%',
                    margin: 0,
                    padding: 0,
                    maxWidth: '100%'
                }
            }
        }
    }
});
