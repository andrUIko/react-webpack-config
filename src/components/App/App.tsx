import styles from "./App.module.scss";
import React, { useState, Suspense, lazy } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "styles/themes.tsx";
import Body from "components/Body/Body.tsx";

const Button = lazy(() => import("components/Button/Button.tsx"));

const App: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className={styles.container}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Button onClick={handleClick}>Click</Button>
                </Suspense>
                {isOpen && <Body />}
            </div>
        </ThemeProvider>
    );
};

export default App;
