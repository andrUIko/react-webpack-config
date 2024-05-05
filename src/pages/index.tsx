import React, { lazy, Suspense } from "react";
function suspense<P extends {}>(
    Component: React.LazyExoticComponent<React.FC<P>>
) {
    const C = Component as unknown as React.FC<P>;

    return (props: P) => (
        <Suspense fallback={<div>Loading...</div>}>
            <C {...props} />
        </Suspense>
    );
}

export const About = suspense(lazy(() => import("./About/About.tsx")));
export const Home = suspense(lazy(() => import("./Home/Home.tsx")));
export const NotFound = suspense(lazy(() => import("./NotFound/NotFound.tsx")));
