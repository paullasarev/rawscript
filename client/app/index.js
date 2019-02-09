import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import './assets/scss/main.scss';

import App from './src/app/app.jsx';

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
  module.hot.accept('./src/app/app.jsx', () => {
    const newApp = require('./src/app/app.jsx').default;
    render(newApp);
  });
}
