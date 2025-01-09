import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthContext } from "./context/AuthContext";
import { ErrorProvider } from "./context/ErrorContext";
import App from "./App";
import { store } from "./store/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthContext>
        <ErrorProvider>
          <App />
        </ErrorProvider>
      </AuthContext>
    </Provider>
  </StrictMode>
);
