import { loadRoute } from "utils/componentLoaders.tsx";

export const Home = loadRoute(() => import("./Home/Home.tsx"));
export const About = loadRoute(() => import("./About/About.tsx"));
export const NotFound = loadRoute(() => import("./NotFound/NotFound.tsx"));
