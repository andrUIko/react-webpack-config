import { StrictMode } from "react";
import { CssBaseline } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as rtl from "@testing-library/react";
import type { Theme } from "@mui/material";
import Provider from "components/Provider/Provider.tsx";

interface WrapperProps {
	children: React.ReactNode;
}

type RenderOptions = rtl.RenderOptions & { theme?: Theme; path?: string };

export * from "@testing-library/react";

export const render = (
	ui: React.ReactElement,
	{ path, ...options }: RenderOptions = {}
) => {
	const Wrapper: React.FC<WrapperProps> = ({ children }) => {
		const router = createBrowserRouter([
			{
				path: path ?? "/",
				element: (
					<Provider>
						<CssBaseline />
						{children}
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
