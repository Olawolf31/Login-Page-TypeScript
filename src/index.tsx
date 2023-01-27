import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

/* const domain = process.env.AUTH0_DOMAIN || ''
const clientId = process.env.AUTH0_CLIENT_ID || '' */

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-ndn5ikyw417phgt7.us.auth0.com"
      clientId="pYYE3OkidQ8Xk2xwIRm3rEgAVuSbnBKK"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
