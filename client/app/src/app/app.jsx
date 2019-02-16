import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { PersistGate } from 'redux-persist/integration/react'

import configureStore from './configure-store';
import Edit from '../components/edit/edit';

const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
        <Router>
          <Switch>
            <Route path='/edit' component={ Edit } exact />
            <Redirect from='/' to='/edit' />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default DragDropContext(HTML5Backend)(App);
