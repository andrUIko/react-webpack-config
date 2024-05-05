import React from "react";
import App from "components/App/App.tsx";
import { About, Home, NotFound } from "pages/index.tsx";
import { RouteObject, createBrowserRouter } from "react-router-dom";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home name="Andrew" />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
];

const router = createBrowserRouter(routes);

export { router, routes };
