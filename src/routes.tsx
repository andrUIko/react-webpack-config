import { About, Home, NotFound } from "pages/index.tsx";
import { RouteObject } from "react-router-dom";
import { loadRoute } from "utils/componentLoaders.tsx";

const AppModule = import("components/App/App.tsx");

const routes: RouteObject[] = [
    {
        path: "/",
        lazy: loadRoute(() => AppModule),
        children: [
            {
                path: "",
                lazy: Home,
            },
            {
                path: "/about",
                lazy: About,
            },
            {
                path: "*",
                lazy: NotFound,
            },
        ],
    },
];

export { routes };
