import React from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const Login = (params) => {
    localStorage.setItem("user", JSON.stringify(params));
  };

  const returUser = () => {
   return JSON.parse(localStorage.getItem("user"));
  };

  return (
    <AuthContext.Provider
      value={{
        Login,
        returUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
