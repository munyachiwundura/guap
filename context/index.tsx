import { useReducer, createContext, Context } from "react";
import { app } from "./reducers/app";

type AppContextType = {
    cart: number
}
const initialState = {
  dark: false
};

const AppContext = createContext<any>(null);

// context provider
const Provider = ({ children }: any) => {
  const [state, dispatch] = useReducer(app, initialState);
  const value = { state, dispatch };

  return (
      <AppContext.Provider value={value} >{children}</AppContext.Provider>  
      )
};

export { AppContext, Provider };