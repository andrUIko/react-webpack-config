import App from "components/App/App.tsx";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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
			<RouterProvider router={router} />
		</StrictMode>
	);
