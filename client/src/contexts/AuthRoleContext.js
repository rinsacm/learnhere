import { createContext } from "react";

export const AuthRoleContext = createContext({
  type: null,
  setRole: () => {},
});
