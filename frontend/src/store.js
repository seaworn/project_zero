import React, { useReducer } from 'react';
import { createContext } from 'react';

export const StoreContext = createContext();

export default function Store({children}) {

  let initialUserState =  {loggedIn: false};
  const [currentUser, dispatchUserAction] = useReducer(
    function (state, action) {
      let newUserState = {};
      if (action.type === 'login') newUserState = {...state, ...action.payload, loggedIn: true};
      else if (action.type === 'logout') newUserState = initialUserState;
      sessionStorage.setItem('user', JSON.stringify(newUserState));
      return newUserState;
    },
    JSON.parse(sessionStorage.getItem('user')) || initialUserState
  );

  return (
    <StoreContext.Provider value={{currentUser, dispatchUserAction}}>
      {children}
    </StoreContext.Provider>
  );
}
