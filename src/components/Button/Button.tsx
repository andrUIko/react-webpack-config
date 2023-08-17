import styles from "./Button.module.scss";

interface ButtonProps {
	onClick: (e: React.MouseEvent) => void;
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
	return (
		<button onClick={onClick} className={styles.purpleButton}>
			{children}
		</button>
	);
};

export default Button;
