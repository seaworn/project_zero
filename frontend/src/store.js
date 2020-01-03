import React, { useState } from 'react';
import { createContext } from 'react';

export const AppContext = createContext({});

export default function Store({children}) {

  const [loggedUser, setLoggedUser] = useState(null);

  return (
    <AppContext.Provider value={{loggedUser, setLoggedUser}}>
      {children}
    </AppContext.Provider>
  );
}
