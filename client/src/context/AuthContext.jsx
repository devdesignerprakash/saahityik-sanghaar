import axios from 'axios';
import React, { createContext, useState, useEffect, useCallback } from 'react';

// Create the context
const AuthContext = createContext();

// Auth Provider Component
export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});
    console.log(user, 'token:', token);

    // Load token from localStorage on component mount
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);
    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const response = await axios.get('http://localhost:8000/api/user/getUser', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                }
            } else {
                setUser({});
            }
        };
        fetchUser();
    }, [token]);

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
        <AuthContext.Provider value={{ token, login, logout,user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
