import { createTheme } from '@mui/material';
import { lightBlue } from '@mui/material/colors';

const defaultTheme = createTheme();
export const theme = createTheme(defaultTheme, {
    palette: {
        primary: {
            main: lightBlue[800]
        },
        secondary: {
            main: lightBlue[500]
        }
    },
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
