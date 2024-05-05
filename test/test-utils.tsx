import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import * as rtl from "@testing-library/react";
import type { Theme } from "@mui/material";
import { darkTheme } from "styles/themes.tsx";
import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";
import { TextEncoder } from "util";
import "whatwg-fetch";

global.TextEncoder = TextEncoder;

expect.extend(toHaveNoViolations);

interface WrapperProps {
    children: React.ReactNode;
}

type RenderOptions = rtl.RenderOptions & {
    theme?: Theme;
};

export * from "@testing-library/react";

export const render = (
    ui: React.ReactElement,
    { theme = darkTheme, ...options }: RenderOptions = {}
) => {
    const Wrapper: React.FC<WrapperProps> = ({ children }) => {
        const TestComponent = () => (
            <ThemeProvider theme={theme}>
                <CssBaseline />

                {children}
            </ThemeProvider>
        );

        return <TestComponent />;
    };
    return rtl.render(ui, {
        wrapper: Wrapper,
        ...options,
    });
};
