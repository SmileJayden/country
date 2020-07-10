import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/store';
import App from './src/app';

const store = createStore(rootReducer);

const rootEl: HTMLElement = document.getElementById('app')!; // don't worry ts ^^@

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
);
