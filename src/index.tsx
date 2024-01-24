import { createRoot } from "react-dom/client";
import { StrictMode, Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const Provider = lazy(() => import("components/Provider/Provider.tsx"));
const App = lazy(() => import("components/App/App.tsx"));

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Suspense fallback={<div>Loading...</div>}>
				<App />
			</Suspense>
		),
	},
]);

const container = document.getElementById("root");

if (container)
	createRoot(container).render(
		<StrictMode>
			<Provider>
				<RouterProvider router={router} />
			</Provider>
		</StrictMode>
	);
