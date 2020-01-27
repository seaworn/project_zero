import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import axios from 'axios';

import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

const history = createBrowserHistory()

axios.interceptors.response.use(undefined, 
  async function (error) {
    const {status} = error.response;
    if (status === 401) {
      if (error.response.data.token_status === 'expired') {
        let user = JSON.parse(sessionStorage.getItem('user'));
        try {
          const refreshResponse = await axios.get(error.response.data.refresh_url, {headers: {'Authorization': `Bearer ${user.refreshToken}`}});
          user.accessToken = refreshResponse.data.refresh_token;
          sessionStorage.setItem('user', JSON.stringify(user));
          const {url, method} = error.response.config
          const retryResponse = await axios({url, method, headers: {'Authorization': `Bearer ${user.accessToken}`}});
          return Promise.resolve(retryResponse);
        } catch (error) {
          // console.log(error);
        }
      }
      history.push('/http401');
    }
    else if (status === 403) history.push('/http403');
    else if (status === 500) history.push('/http500');
    return Promise.reject(error);
});

ReactDOM.render(<Router history={history}><App/></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
