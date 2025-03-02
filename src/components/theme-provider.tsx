import React, { createContext, useContext, ReactNode } from 'react';

export const ThemeContext = createContext({});

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContext.Provider value={{}}>
      {children}
    </ThemeContext.Provider>
  );
}
