import React from 'react';
import { Link } from 'react-router-dom';

import Main from './main';


export default function Http401() {
  return (
    <Main>
      <div className="jumbotron">
        <div className="text-center">
          <h1>401 - Unauthorised</h1>
          <p>You are not authorized to view this page. Please <Link to="/login">log in</Link>.</p>
        </div>
      </div>
    </Main>
  );
}
