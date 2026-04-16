import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUser(decoded.sub);
          // Standardize role to uppercase string if it exists
          const decodedRole = decoded.role ? String(decoded.role).toUpperCase() : null;
          setRole(decodedRole);
          localStorage.setItem('token', token);
        } catch (error) {
          console.error("Invalid token", error);
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const login = (data) => {
    setToken(data.token);
    setUser(data.email);
    // Standardize role from API response as well
    const apiRole = data.role ? String(data.role).toUpperCase() : null;
    setRole(apiRole);
    localStorage.setItem('token', data.token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
