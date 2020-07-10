import { createElement } from 'react';
import { render } from 'react-dom';
import App from './src/app';

const rootEl: HTMLElement = document.getElementById('app')!; // don't worry ts ^^@

render(createElement(App), rootEl);
