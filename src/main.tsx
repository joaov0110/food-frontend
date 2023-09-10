import "./index.scss";

import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import router from "./config/router";

import { QueryClient, QueryClientProvider } from "react-query";

import { CssBaseline } from "@mui/material";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline enableColorScheme>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </CssBaseline>
  </React.StrictMode>
);
