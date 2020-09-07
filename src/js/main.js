import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from '@material-ui/styles';

import configureStore, { history } from './store';
import theme from './theme';

import routes from './routes';

const store = configureStore();

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        { routes }
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);