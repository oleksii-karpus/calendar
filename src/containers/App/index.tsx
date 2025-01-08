import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../../styles/theme';
import Routing from '../Routing';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routing />
        </ThemeProvider>
    );
};

export default App;
