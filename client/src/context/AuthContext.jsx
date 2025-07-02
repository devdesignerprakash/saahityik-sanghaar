import React, { createContext, useState, useEffect, useCallback } from 'react';

// Create the context
const AuthContext = createContext();

// Auth Provider Component
export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState('');

  // Load token from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Login function - manually sync token 
  //minimize the everytime re-render issuse when login is clicked
  const login = useCallback(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setToken('');
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
