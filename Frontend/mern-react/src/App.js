import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
function App() {
  return (
    <Router >
      <Switch>
        <Route path="/SignupPage" exact>
          <SignupPage />
        </Route>
        <Route path="/SigninPage" exact>
          <SigninPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
