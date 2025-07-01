import React, { createContext } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [token,setToken]=useState("")
  return (
    <AuthContext.Provider value={{token}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
