import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';

import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Appointment from './components/appointment';
import Store from './store';
import Http401 from './components/http401';
import Http403 from './components/http403';
import Http404 from './components/http404';
import Http500 from './components/http500';
import './App.css';


export default function App() {
  return (
    <Store>
      <NotificationContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/schedule-appointment" component={Appointment} />
        <Route path="/http401" component={Http401} />
        <Route path="/http403" component={Http403} />
        <Route path="/http500" component={Http500} />
        <Route component={Http404} />{/* Catch any other path */}
      </Switch>
    </Store>
  );
}
