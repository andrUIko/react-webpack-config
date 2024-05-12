import styles from "./App.module.scss";
import { useState } from "react";
import Body from "components/Body/Body.tsx";
import { Link } from "react-router-dom";
import { lazyLoad } from "utils/componentLoaders.tsx";
import { routes } from "routes.tsx";

const Button = lazyLoad(() => import("components/Button/Button.tsx"));

const App: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.container}>
            <Button onClick={handleClick}>Click</Button>
            {isOpen && <Body />}
            <Link to={"/"}>Home</Link>
            <Link to={"/about"}>About</Link>
            {routes}
        </div>
    );
};

export default App;
