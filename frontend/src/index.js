import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import App, { history } from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

axios.interceptors.response.use(undefined, error => {
  switch (error.response.status) {
    case 401:
      history.push('/401');
      break;
    case 403:
      history.push('/403');
      break;
    case 500:
      history.push('/500');
      break;
    default:
      break;
  }
  return error;
});

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
