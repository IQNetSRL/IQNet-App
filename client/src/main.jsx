import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import Store from "../src/redux/store.js";
import "./index.module.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-turz1d4jnq1ljebe.us.auth0.com"
    clientId="bcoMdxZEYC3Z00LTKJ2df7sPHWzXNyJU"
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <Provider store={Store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </Auth0Provider>
);
