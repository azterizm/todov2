import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './state/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

import './index.css';

render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.register()
