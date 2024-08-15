;
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode: 'dark',
    primary: {
      light: blue[300],
      main: blue[800],
      dark: blue[900],
    }
  },
});

export default theme;
