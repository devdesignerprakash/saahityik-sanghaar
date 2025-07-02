import axios from 'axios';
import React, { createContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    // Load token on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // Fetch user whenever token is set
    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setUser(null);
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/api/user/getUser', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
                setUser(null); // Make sure to clear on error
            }
        };

        fetchUser();
    }, [token]);

    // Login
    const login = useCallback((newToken, rememberMe = false) => {
        if (rememberMe) {
            localStorage.setItem('authToken', newToken);
        } else {
            sessionStorage.setItem('authToken', newToken);
        }
        setToken(newToken);
    }, []);

    // Logout
    const logout = useCallback(() => {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ token, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
