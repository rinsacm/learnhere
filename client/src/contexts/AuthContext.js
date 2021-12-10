import { createContext } from "react";

export const AuthContext = createContext({
  type: null,
  toggleType: () => {},
});
