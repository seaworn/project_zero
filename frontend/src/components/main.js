import React from 'react';

import Navigation from './navigation';
import Footer from './footer';
import Timer from './timer';

export default function Main({children}) {
  return (
    <>
      <Navigation/>
      <div className="container-fluid bg-light text-right pb-2" style={{marginBottom: '40px'}}>
        <Timer label="Active"/>
      </div>
      {children}
      <Footer/>
    </>
  );
}
