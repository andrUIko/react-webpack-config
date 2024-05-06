import { lazyLoad } from "utils/componentLoaders.tsx";

export const Home = lazyLoad(() => import("./Home/Home.tsx"));
export const About = lazyLoad(() => import("./About/About.tsx"));
export const NotFound = lazyLoad(() => import("./NotFound/NotFound.tsx"));
