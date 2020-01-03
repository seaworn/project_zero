import React from 'react';
import { Link } from 'react-router-dom';

import Main from './main';


export default function Http500() {
  return (
    <Main>
      <div className="jumbotron">
        <div className="text-center">
          <h1>500 - Internal Server Error</h1>
          <p>Sorry, something went terribly wrong. Let's take you <Link to="/">back home</Link>.</p>
        </div>
      </div>
    </Main>
  );
}
