import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthContext } from "./context/AuthContext";
import { ErrorProvider } from "./context/ErrorContext";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext>
      <ErrorProvider>
        <App />
      </ErrorProvider>
    </AuthContext>
  </StrictMode>
);
