import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { createBrowserHistory } from 'history';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';

import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Appointment from './components/appointment';
import Http401 from './components/http401';
import Http403 from './components/http403';
import Http404 from './components/http404';
import Http500 from './components/http500';
import Store from './store';
import './App.css';

export const history = createBrowserHistory();

export default function App() {
  return (
    <Store>
      <Router history={history}>
        <NotificationContainer/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/schedule-appointment" component={Appointment}/>
          <Route path="/401" component={Http401}/>
          <Route path="/403" component={Http403}/>
          <Route path="/500" component={Http500}/>
          <Route component={Http404}/>{/* Catch any other path */}
        </Switch>
      </Router>
    </Store>
  );
}
