import * as React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
	children: React.ReactNode;
	onClick: (e: React.MouseEvent) => void;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
	return <button className={styles.Button}>{children}</button>;
};

export default Button;
