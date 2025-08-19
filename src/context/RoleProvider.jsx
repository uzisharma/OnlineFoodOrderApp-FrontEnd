import { useState } from "react";
import { RoleContext } from "./RoleContext";

export function RoleProvider({ children }) {
  const [role, setRole] = useState("user");
  const [isLogged, setIsLogged] = useState(false);

  return (
    <RoleContext.Provider value={{ role, setRole, isLogged, setIsLogged }}>
      {children}
    </RoleContext.Provider>
  );
}
