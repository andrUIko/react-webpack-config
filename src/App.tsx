import style from "./App.module.scss";
import Body from "./Body.tsx";
import Button from "./Button.tsx";
import { useState } from "react";

const App: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={style.Container}>
			<Button onClick={() => setIsOpen(!isOpen)}>Click</Button>
			{isOpen && <Body />}
		</div>
	);
};

export default App;
