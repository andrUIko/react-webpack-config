import styles from "./App.module.scss";
import { useState, Suspense, lazy } from "react";

import Body from "components/Body/Body.tsx";

const Button = lazy(() => import("components/Button/Button.tsx"));

const App: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};
	return (
		<div className={styles.container}>
			<Suspense fallback={<div>Loading...</div>}>
				<Button onClick={handleClick}>Click</Button>
			</Suspense>
			{isOpen && <Body />}
		</div>
	);
};

export default App;
