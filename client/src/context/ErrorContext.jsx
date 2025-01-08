import { createContext, useContext, useState } from "react";
import ErrorContainer from "@/components/Error/ErrorContainer";
const ErrorContext = createContext(undefined);
export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
      <ErrorContainer />
    </ErrorContext.Provider>
  );
};
export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("context must be used from client component");
  }
  return context;
};

export default ErrorContext;
