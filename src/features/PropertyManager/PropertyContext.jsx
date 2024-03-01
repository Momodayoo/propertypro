import { createContext, useReducer, useContext } from "react";
import { propertyReducer, initialState } from "./propertyReducer";
import { getAllProperty, deleteProperty, createProperty, updateProperty, selectProperty } from "./PropertyActions";

const PropertyContext = createContext();

const PropertyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(propertyReducer, initialState);

  const value = { state, dispatch };
  return (
    <PropertyContext.Provider value={{ value }}>{children}</PropertyContext.Provider>
  );
};

const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error("useProperty must be used within a PropertyProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { PropertyProvider, useProperty, deleteProperty, getAllProperty, createProperty, updateProperty, selectProperty }
