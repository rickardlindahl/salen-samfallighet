import { createContext, useContext } from "react";
import type { User } from "~/types/user";

export const SessionContext = createContext<{ isLoggedIn: boolean; user?: User }>({
  isLoggedIn: false,
  user: undefined,
});

export const useSession = () => useContext(SessionContext);
