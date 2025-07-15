import axios from 'axios';
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // ✅ New state
    const [justLoggedIn, setJustLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Load token on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        } else {
            setIsLoading(false); // ✅ No token = done loading
        }
    }, []);


    // Fetch user when token is set
    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setUser(null);
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/api/user/getUser', {
                    headers: {
                        Authorization: `Bearer ${token.trim()}`,
                    },
                });
                setUser(response?.data);
                
                // Redirect after successful login
                if (justLoggedIn && response?.data) {
                    if (response.data.userType === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/');
                    }
                    setJustLoggedIn(false);
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
                setUser(null);
            } finally {
                setIsLoading(false);
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
        setJustLoggedIn(true);
    }, [navigate]);

    // Logout
    const logout = useCallback(() => {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        setIsLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ token, login, logout, user, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
