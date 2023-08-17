import { StrictMode } from "react";
import { darkTheme } from "../src/styles/themes.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as rtl from "@testing-library/react";
import type { Theme } from "@mui/material";

interface WrapperProps {
	children: React.ReactNode;
}

type RenderOptions = rtl.RenderOptions & { theme?: Theme; path?: string };

export * from "@testing-library/react";

export const render = (ui: React.ReactElement, options?: RenderOptions) => {
	const Wrapper: React.FC<WrapperProps> = ({ children }) => {
		const theme = options?.theme ?? darkTheme;
		const path = options?.path ?? "/";

		delete options?.theme;
		delete options?.path;

		const router = createBrowserRouter([
			{
				path: path,
				element: (
					<ThemeProvider theme={theme}>
						<CssBaseline />
						{children}
					</ThemeProvider>
				),
			},
		]);

		return (
			<StrictMode>
				<RouterProvider router={router} />
			</StrictMode>
		);
	};
	return rtl.render(ui, { wrapper: Wrapper, ...options });
};
