import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import Activate from './pages/Activation'; 
import CourseSetupPage from './pages/CourseSetupPage';
import ScheduleBuilderPage from './pages/ScheduleBuilderPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router >
      <Switch>
        <Route path="/SignupPage" exact> <SignupPage /> </Route>
        <Route path="/SigninPage" exact> <SigninPage /> </Route>
        <Route exact path="/authentication/email-activate/:token"> <Activate/> </Route>
        <Route path="/CourseSetupPage" exact> <CourseSetupPage /></Route>
        <Route path="/ScheduleBuildPage" exact><ScheduleBuilderPage /></Route>
        <Route path="/HomePage" exact><HomePage /></Route>
        <Redirect to="/SignupPage" />
      </Switch>
    </Router>
  );
}

export default App;
