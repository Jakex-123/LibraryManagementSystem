//@ts-nocheck
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const cleanToken = token.split(" ")[1];
      const payload = JSON.parse(atob(cleanToken.split(".")[1]));
      setAuth({ token: cleanToken, role: payload.role });
    } else {
      navigate("/");
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    const cleanToken = token.split(" ")[1]; 
    const payload = JSON.parse(atob(cleanToken.split(".")[1])); 
    setAuth({ token: cleanToken, role: payload.role });
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return null; 
  }

  return (
    <AuthContext.Provider value={{ login, logout, auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
