import App from "components/App/App.tsx";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "styles/themes.tsx";
import CssBaseline from "@mui/material/CssBaseline";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Provider } from "react-redux";
import { store } from "store/rootStore.ts";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
]);

const container = document.getElementById("root");

if (container)
	createRoot(container).render(
		<StrictMode>
			<Provider store={store}>
				<ThemeProvider theme={darkTheme}>
					<CssBaseline />
					<RouterProvider router={router} />
				</ThemeProvider>
			</Provider>
		</StrictMode>
	);
