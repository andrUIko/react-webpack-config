import { StrictMode } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as rtl from "@testing-library/react";
import type { Theme } from "@mui/material";
import { darkTheme } from "styles/themes.tsx";
import { Provider } from "react-redux";
import { store } from "store/rootStore.ts";

interface WrapperProps {
	children: React.ReactNode;
}

type RenderOptions = rtl.RenderOptions & { theme?: Theme; path?: string };

export * from "@testing-library/react";

export const render = (
	ui: React.ReactElement,
	{ theme, path, ...options }: RenderOptions = {}
) => {
	const Wrapper: React.FC<WrapperProps> = ({ children }) => {
		const router = createBrowserRouter([
			{
				path: path ?? "/",
				element: (
					<Provider store={store}>
						<ThemeProvider theme={theme ?? darkTheme}>
							<CssBaseline />
							{children}
						</ThemeProvider>
					</Provider>
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
