import styles from "./App.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Body from "components/Body/Body.tsx";
import Button from "components/Button/Button.tsx";
import { RootState } from "store/rootStore.ts";
import { toggle } from "store/appSlice.ts";

const App: React.FC = () => {
	const isOpen = useSelector((state: RootState) => state.app.isOpen);
	const dispatch = useDispatch();

	return (
		<div className={styles.container}>
			<Button onClick={() => dispatch(toggle())}>Click</Button>
			{isOpen && <Body />}
		</div>
	);
};

export default App;
