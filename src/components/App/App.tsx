import styles from "./App.module.scss";
import Body from "../Body/Body.tsx";
import Button from "../Button/Button.tsx";
import { useState } from "react";

const App: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={styles.Container}>
			<Button onClick={handleClick}>Click</Button>
			{isOpen && <Body />}
		</div>
	);
};

export default App;
