import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "styles/themes.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "store/index.ts";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <BrowserRouter>{children}</BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
};

export default Providers;
