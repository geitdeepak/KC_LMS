import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import {
  ThemeProvider,
  CssBaseline
} from "@mui/material";

import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

import App from "./App";

import theme
  from "./theme/theme";

import "./index.css";

const queryClient =
  new QueryClient({

    defaultOptions: {

      queries: {

        retry: 1,

        refetchOnWindowFocus: false,

        staleTime: 1000 * 60 * 5

      }

    }

  });

createRoot(
  document.getElementById("root")!
).render(

  <StrictMode>

    <QueryClientProvider
      client={queryClient}
    >

      <ThemeProvider
        theme={theme}
      >

        <CssBaseline />

        <BrowserRouter>

          <App />

        </BrowserRouter>

      </ThemeProvider>

    </QueryClientProvider>

  </StrictMode>

);