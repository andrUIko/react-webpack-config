import { createRoot } from "react-dom/client";
import React, { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { router } from "router.tsx";

const container = document.getElementById("root");

if (container)
    createRoot(container).render(
        <StrictMode>
            <RouterProvider
                router={router}
                fallbackElement={<div>Loading...</div>}
            />
        </StrictMode>
    );
