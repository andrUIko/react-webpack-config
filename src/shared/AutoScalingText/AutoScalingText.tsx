import { useRef } from "react";
import styles from "./AutoScalingText.module.scss";

interface AutoScalingTextProps {
	children?: React.ReactNode;
}

const AutoScalingText: React.FC<AutoScalingTextProps> = ({ children }) => {
	const ref = useRef<HTMLDivElement>(null);

	const getScale = () => {
		const node = ref.current;
		if (!node) return 1;
		const parentNode = node.parentNode;
		if (!(parentNode instanceof HTMLElement)) return 1;
		const availableWidth = parentNode.offsetWidth;
		const actualWidth = node.offsetWidth;
		const actualScale = availableWidth / actualWidth;
		if (actualScale < 1) {
			return actualScale * 0.9;
		}
		return 1;
	};

	const scale = getScale();

	return (
		<div
			className={styles.AutoScalingText}
			data-testid="total"
			style={{ transform: `scale(${scale},${scale})` }}
			ref={ref}>
			{children}
		</div>
	);
};

export default AutoScalingText;
