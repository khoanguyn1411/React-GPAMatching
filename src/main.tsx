import "./styles/global.css";
import "./styles/tailwind.css";
import "react-toastify/dist/ReactToastify.min.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
