"use client";

import { createContext, ReactNode, useContext, useState } from "react";

// 🔧 1. Defina o tipo dos dados que o contexto vai armazenar
type Global = {
  name: string;
  email: string;
};

type GlobalContextType = {
  user: Global | null;
  setUser: (user: Global | null) => void;
};

// 🟡 2. Crie o contexto com valor inicial vazio
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// 🧱 3. Crie o Provider
export function GlobalProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Global | null>(null);

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
}

// 🔌 4. Hook para usar o contexto com segurança
export function useUser() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
