import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "./../Actions/Index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("chat_token");
   
    if (token) {
   
      setIsAuthenticated(true);
      server.defaults.headers.Authorization = `Bearer ${token}`;
    }
    setLoading(false);
  }, [navigate]);

  const login = (token) => {
    localStorage.setItem("chat_token", token);
    server.defaults.headers.Authorization = `Bearer ${token}`;
    setIsAuthenticated(true);
    setLoading(false);
    navigate("/home");
  };

  const logout = () => {
    localStorage.removeItem("chat_token");
    delete server.defaults.headers.Authorization;
    delete server.defaults.headers.common["X-Socket-ID"];
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
