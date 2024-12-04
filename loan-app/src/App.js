import './index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MainPage from './components/MainPage'

const theme = createTheme({
  palette: {
    primary: {
      main: '#405373', 
    },
    secondary: {
      main: '#A2D8CE',
    },
  },
})

function App() {

  return (
    <ThemeProvider theme={theme}>
      <MainPage/>
    </ThemeProvider>
    
  );
}

export default App;
