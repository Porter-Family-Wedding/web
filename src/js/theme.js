import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: {
      light: '#f8ffd7',
      main: '#c5e1a5',
      dark: '#94af76',
      contrastText: '#000',
    },
    secondary: {
      light: '#fffff7',
      main: '#fff9c4',
      dark: '#cbc693',
      contrastText: '#000',
    },
  },
  background: {
    paper: '#fff',
    default: '#fff',
    text: '#000',
  },
});

export default theme;