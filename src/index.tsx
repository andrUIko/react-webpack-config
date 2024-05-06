import { createRoot } from "react-dom/client";
import React, { StrictMode } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { lazyLoad } from "utils/componentLoaders.tsx";

const App = lazyLoad(() => import("components/App/App.tsx"));
const Providers = lazyLoad(() => import("providers.tsx"));
const container = document.getElementById("root");

if (container)
    createRoot(container).render(
        <StrictMode>
            <Providers>
                <App />
            </Providers>
        </StrictMode>
    );
