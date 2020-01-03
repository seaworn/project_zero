import React from 'react';

import Main from './main';


export default function Http403() {
  return (
    <Main>
      <div className="jumbotron">
        <div className="text-center">
            <h1>403 - Forbidden</h1>
            <p>You are forbidden from viewing this page.</p>
        </div>
      </div>
    </Main>
  );
}
