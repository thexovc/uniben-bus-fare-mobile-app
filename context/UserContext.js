import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    console.log("refresh");
  }, [refresh]);

  // Add any necessary functions to update the user state (e.g., login, logout)

  return (
    <UserContext.Provider value={{ user, setUser, setRefresh, refresh }}>
      {children}
    </UserContext.Provider>
  );
};
