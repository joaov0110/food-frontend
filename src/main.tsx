import "./index.scss";

import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import router from "./config/router";

import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline enableColorScheme>
      <RouterProvider router={router} />
    </CssBaseline>
  </React.StrictMode>
);
