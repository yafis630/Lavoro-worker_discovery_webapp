import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem("auth") || {});
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") || false);
  useEffect(() => {
    localStorage.setItem("auth", auth);
    localStorage.setItem("isAuth", isAuth);
  }, [auth, isAuth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
