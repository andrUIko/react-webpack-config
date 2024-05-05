import styles from "./App.module.scss";
import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "styles/themes.tsx";
import Body from "components/Body/Body.tsx";
import { Link, Outlet } from "react-router-dom";
import { lazyLoad } from "utils/componentLoaders.tsx";

const Button = lazyLoad(() => import("components/Button/Button.tsx"));

const App: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className={styles.container}>
                <Button onClick={handleClick}>Click</Button>
                {isOpen && <Body />}
            </div>
            <Link to={"/"}>Home</Link>
            <Link to={"/about"}>About</Link>
            <Outlet />
        </ThemeProvider>
    );
};

export default App;
