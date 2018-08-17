import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import Reducers from 'reducers';

import { ThemeProvider } from 'styled-components';
import './global-styles';
import globalTheme from './global-theme';

const MOUNT_NODE = document.getElementById('root');

const store = createStore(Reducers);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={globalTheme}>
      <App />
    </ThemeProvider>
  </Provider>,
  MOUNT_NODE
);
registerServiceWorker();
