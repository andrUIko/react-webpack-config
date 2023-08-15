import App from "./components/App/App.tsx";
import { createRoot } from "react-dom/client";
import "@total-typescript/ts-reset";

export const a = 129;

const container = document.getElementById("root");

if (container) createRoot(container).render(<App />);
