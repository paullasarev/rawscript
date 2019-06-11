import '@babel/polyfill';
import { polyfill } from 'mobile-drag-drop';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import './assets/scss/main.scss';

import App from './src/app/app';

polyfill();

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./src/app/app.tsx', () => {
    const newApp = require('./src/app/app.tsx').default;
    render(newApp);
  });
}
