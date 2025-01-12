import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { theme } from '../../styles/theme';
import Routing from '../Routing';
import store from '../../store';

const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routing />
            </ThemeProvider>
        </Provider>
    );
};

export default App;
