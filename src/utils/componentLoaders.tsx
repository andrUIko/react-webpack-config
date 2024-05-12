import { ComponentType, lazy, Suspense } from "react";

export function lazyLoad<P extends {}>(
    moduleImporter: () => Promise<{ default: ComponentType<P> }>,
    fallback?: React.ReactNode
) {
    const Component = lazy(() => moduleImporter());

    return (
        props: JSX.IntrinsicAttributes &
            (React.PropsWithRef<P> | React.PropsWithoutRef<P>)
    ) => (
        <Suspense fallback={fallback}>
            <Component {...props} />
        </Suspense>
    );
}

export function loadRoute(
    moduleImporter: () => Promise<{ default: ComponentType }>
) {
    return async () => {
        const { default: Component } = await moduleImporter();
        return { Component };
    };
}
