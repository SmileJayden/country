import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { rootReducer, rootEpic } from '~/store';
import App from '~/app';

const epicMiddleware = createEpicMiddleware();

const store = createStore(rootReducer, applyMiddleware(epicMiddleware, logger));

epicMiddleware.run(rootEpic);

const rootEl: HTMLElement = document.getElementById('app')!; // don't worry ts ^^@

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
);
