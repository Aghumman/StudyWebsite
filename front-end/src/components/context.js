import { createContext, useContext } from "react";

export const DecksContext = createContext(null);

export const useDecksContext = () => {
  const context = useContext(DecksContext);

  if (!context) {
    throw new Error("useDecksContext must be used in a DecksContext Provider");
  }

  return context;
};
