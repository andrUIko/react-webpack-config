import * as React from "react";
import style from "./App.module.css";

const App: React.FC = () => {
	const [count, setCount] = React.useState(0);

	return <div className={style.Container}>{count}</div>;
};

export default App;
