import React from 'react';
import { Link } from 'react-router-dom';

import Main from './main';


export default function Http404() {
  return (
    <Main>
      <div className="jumbotron">
        <div className="text-center">
          <h1>404 - Not Found!</h1>
          <p>Sorry, the requested page doesn't exist. Go <Link to="/">back home</Link>.</p>
        </div>
      </div>
    </Main>
  );
}
