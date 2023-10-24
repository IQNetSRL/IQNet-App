import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import Store from "../src/redux/store.js";
// import { LanguageProvider } from "../src/language/LanguageContext.jsx";
import "./index.module.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Provider store={Store}> */}
      {/* <LanguageProvider> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      {/* </LanguageProvider> */}
    {/* </Provider> */}
  </React.StrictMode>
);
