import App from "./App.tsx";
import { createRoot } from "react-dom/client";

export const a = 129;

const container = document.getElementById("root");

if (container) createRoot(container).render(<App />);
