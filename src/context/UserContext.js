import { createContext, useReducer } from 'react';
import { getCurrentUser } from '../services/authService';
import UserReducer from './UserReducer';

const currentUser = getCurrentUser();

const INITIAL_STATE = {
  currentUser,
};

const UserContext = createContext();
export default UserContext;

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  return (
    <UserContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
