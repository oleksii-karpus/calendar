import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../styles/theme';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            React App
        </ThemeProvider>
    );
};

export default App;
