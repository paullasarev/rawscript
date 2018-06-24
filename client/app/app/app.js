import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './configure-store';
import Edit from '../components/edit/edit';

const store = configureStore();

const App = () => {
  return (
    <Provider store={ store }>
      <Router>
        <Switch>
          <Route path='/edit' component={ Edit } exact />
          <Redirect from='/' to='/edit' />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;

