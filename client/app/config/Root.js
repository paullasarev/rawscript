import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Edit from '../components/edit/edit';

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path='/edit' component={ Edit } exact />
        <Redirect from='/' to='/edit' />
      </Switch>
    </Router>
  );
};

export default Root;

