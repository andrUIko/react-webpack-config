import styles from "./App.module.scss";
import Body from "../Body/Body.tsx";
import Button from "../Button/Button.tsx";
import { useState } from "react";

const App: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={styles.Container}>
			<Button onClick={() => setIsOpen(!isOpen)}>Click</Button>
			{isOpen && <Body />}
		</div>
	);
};

export default App;
