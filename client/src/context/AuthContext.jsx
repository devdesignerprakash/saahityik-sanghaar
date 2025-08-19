import http from '../utils/http';
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [justLoggedIn, setJustLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Load token on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        } else {
            setIsLoading(false);
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
                const response = await http.get('/api/user/getUser');
                setUser(response?.data?.data || null);
                
                // Redirect after successful login
                if (justLoggedIn && response?.data) {
                    if (response.data.data.userType === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/');
                    }
                    setJustLoggedIn(false);
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
                toast.error('Session expired. Please log in again.');
                logout();
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [token, justLoggedIn, navigate]);

    // Login
    const login = useCallback((newToken, rememberMe = false) => {
        if (rememberMe) {
            localStorage.setItem('authToken', newToken);
        } else {
            sessionStorage.setItem('authToken', newToken);
        }
        setToken(newToken);
        setJustLoggedIn(true);
    }, []);

    // Logout
    const logout = useCallback(() => {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        setIsLoading(false);
        navigate('/login');
        toast.info('You have been logged out');
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ token, login, logout, user, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
