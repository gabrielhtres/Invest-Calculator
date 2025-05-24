"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type GlobalContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  return (
    <GlobalContext.Provider value={{ token, setToken }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useToken() {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error("token must be used within a GlobalProvider");
  }

  return { token: context.token, setToken: context.setToken };
}
