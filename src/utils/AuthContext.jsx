import React, { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthContext = createContext();

// AuthProvider to supply authentication state to components
export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { id, name, email, token, isAuthenticated } = useSelector((state) => state.user);


  return (
    <AuthContext.Provider value={{ id, name, email, token, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
