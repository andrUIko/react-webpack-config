import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "styles/themes.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "store/rootStore.ts";

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<ReduxProvider store={store}>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ReduxProvider>
	);
};

export default Provider;
