import { CssBaseline, ThemeProvider } from "@mui/material";
import * as rtl from "@testing-library/react";
import type { Theme } from "@mui/material";
import { darkTheme } from "styles/themes.tsx";
import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";
import { TextEncoder } from "util";
import "whatwg-fetch";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { RootState, setupStore } from "store/index.ts";

global.TextEncoder = TextEncoder;

expect.extend(toHaveNoViolations);

type RenderOptions = rtl.RenderOptions & {
    theme?: Theme;
    path?: string;
    initialState?: Partial<RootState>;
    store?: ReturnType<typeof configureStore>;
};

export * from "@testing-library/react";

export const render = (
    ui: React.ReactElement,
    {
        theme = darkTheme,
        path = "/",
        initialState = {},
        store = setupStore(initialState),
        ...options
    }: RenderOptions = {}
) => {
    return rtl.render(ui, {
        wrapper: ({ children }) => (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <MemoryRouter initialEntries={[path]}>
                        {children}
                    </MemoryRouter>
                </ThemeProvider>
            </Provider>
        ),
        ...options,
    });
};
