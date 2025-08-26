import { useState } from "react";
import { RoleContext } from "./RoleContext";

export function RoleProvider({ children }) {
  const [role, setRole] = useState("user");
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLogged, setIsLogged] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  return (
    <RoleContext.Provider
      value={{
        cartItemCount,
        setCartItemCount,
        role,
        setRole,
        isLogged,
        setIsLogged,
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}
