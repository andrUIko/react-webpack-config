import { createRoot } from "react-dom/client";
import React, { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { lazyLoad } from "utils/componentLoaders.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "styles/themes.tsx";
import { Provider } from "react-redux";
import { store } from "store/index.ts";

const App = lazyLoad(() => import("components/App/App.tsx"));

const container = document.getElementById("root");

if (container)
    createRoot(container).render(
        <StrictMode>
            <Provider store={store}>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ThemeProvider>
            </Provider>
        </StrictMode>
    );
