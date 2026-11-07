import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const savedUser = localStorage.getItem('serbisyou_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('serbisyou_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setCurrentUser(userData);
    localStorage.setItem('serbisyou_user', JSON.stringify(userData));
    if (token) localStorage.setItem('serbisyou_token', token);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('serbisyou_user');
    localStorage.removeItem('serbisyou_token');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
