import { Suspense, useEffect, useReducer } from "react";
import styles from "./Calculator.module.scss";
import CalculatorDisplay from "../CalculatorDisplay/CalculatorDisplay.tsx";

const CalculatorOperations: Record<
	string,
	(prevValue: number, nextValue: number) => number
> = {
	"/": (prevValue, nextValue) => prevValue / nextValue,
	"*": (prevValue, nextValue) => prevValue * nextValue,
	"+": (prevValue, nextValue) => prevValue + nextValue,
	"-": (prevValue, nextValue) => prevValue - nextValue,
	"=": (prevValue, nextValue) => nextValue,
};

interface CalculatorKeyProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	className?: string;
}

const CalculatorKey: React.FC<CalculatorKeyProps> = ({
	className = "",
	...props
}) => {
	return (
		<button className={`${styles.calculatorKey} ${className}`} {...props} />
	);
};

interface State {
	value: null | number;
	displayValue: string;
	operator: null | string;
	waitingForOperand: boolean;
}

const calcReducer = (currentState: State, newState: Partial<State>) => {
	return { ...currentState, ...newState };
};

const Calculator: React.FC = () => {
	const [state, setState] = useReducer(calcReducer, {
		value: null,
		displayValue: "0",
		operator: null,
		waitingForOperand: false,
	});

	const { value, displayValue, operator, waitingForOperand } = state;

	const displayIsNonZero = displayValue !== "0";
	const clearText = displayIsNonZero ? "C" : "AC";

	const clearAll = () => {
		setState({
			value: null,
			displayValue: "0",
			operator: null,
			waitingForOperand: false,
		});
	};

	const clearDisplay = () => {
		setState({
			displayValue: "0",
		});
	};

	const clearLastChar = () => {
		setState({
			displayValue:
				displayValue.substring(0, displayValue.length - 1) || "0",
		});
	};

	const toggleSign = () => {
		const newValue = parseFloat(displayValue) * -1;

		setState({
			displayValue: String(newValue),
		});
	};

	const inputPercent = () => {
		const currentValue = parseFloat(displayValue);

		if (currentValue === 0) return;

		const fixedDigits = displayValue.replace(/^-?\d*\.?/, "");
		const newValue = parseFloat(displayValue) / 100;

		setState({
			displayValue: String(newValue.toFixed(fixedDigits.length + 2)),
		});
	};

	const inputDot = () => {
		if (!displayValue.includes(".")) {
			setState({
				displayValue: `${displayValue}.`,
				waitingForOperand: false,
			});
		}
	};

	const inputDigit = (digit: number) => {
		if (waitingForOperand) {
			setState({
				displayValue: String(digit),
				waitingForOperand: false,
			});
		} else {
			setState({
				displayValue:
					displayValue === "0" ? String(digit) : displayValue + digit,
			});
		}
	};

	const performOperation = (nextOperator: null | string) => {
		const inputValue = parseFloat(displayValue);

		if (value == null) {
			setState({
				value: inputValue,
			});
		} else if (operator) {
			const currentValue = value || 0;
			const newValue = CalculatorOperations[operator](
				currentValue,
				inputValue
			);

			setState({
				value: newValue,
				displayValue: String(newValue),
			});
		}

		setState({
			waitingForOperand: true,
			operator: nextOperator,
		});
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		let { key } = event;

		if (key === "Enter") key = "=";

		if (/\d/.test(key)) {
			event.preventDefault();
			inputDigit(parseInt(key, 10));
		} else if (key in CalculatorOperations) {
			event.preventDefault();
			performOperation(key);
		} else if (key === ".") {
			event.preventDefault();
			inputDot();
		} else if (key === "%") {
			event.preventDefault();
			inputPercent();
		} else if (key === "Backspace") {
			event.preventDefault();
			clearLastChar();
		} else if (key === "Clear") {
			event.preventDefault();

			if (state.displayValue === "0") {
				clearAll();
			} else {
				clearDisplay();
			}
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	});

	return (
		<div className={styles.calculator}>
			<Suspense fallback={<div>Loading...</div>}>
				<CalculatorDisplay value={displayValue} />
			</Suspense>
			<div className={styles.calculatorKeypad}>
				<div className={styles.inputKeys}>
					<div className={styles.functionKeys}>
						<CalculatorKey
							onClick={() => {
								displayIsNonZero ? clearDisplay() : clearAll();
							}}>
							{clearText}
						</CalculatorKey>
						<CalculatorKey
							onClick={() => {
								toggleSign();
							}}>
							±
						</CalculatorKey>
						<CalculatorKey
							onClick={() => {
								inputPercent();
							}}>
							%
						</CalculatorKey>
					</div>
					<div className={styles.digitKeys}>
						<CalculatorKey
							className={styles.key0}
							onClick={() => {
								inputDigit(0);
							}}>
							0
						</CalculatorKey>
						<CalculatorKey
							className={styles.keyDot}
							onClick={() => {
								inputDot();
							}}>
							●
						</CalculatorKey>
						<CalculatorKey
							onClick={() => {
								inputDigit(1);
							}}>
							1
						</CalculatorKey>
						<CalculatorKey
							onClick={() => {
								inputDigit(2);
							}}>
							2
						</CalculatorKey>
						<CalculatorKey
							onClick={() => {
								inputDigit(3);
							}}>
							3
						</CalculatorKey>
						<CalculatorKey
							onClick={() => {
								inputDigit(4);
							}}>
							4
						</CalculatorKey>
						<CalculatorKey
							onClick={() => {
								inputDigit(5);
							}}>
							5
						</CalculatorKey>
						<CalculatorKey
							onClick={() => {
								inputDigit(6);
							}}>
							6
						</CalculatorKey>
						<CalculatorKey
							onClick={() => {
								inputDigit(7);
							}}>
							7
						</CalculatorKey>
						<CalculatorKey
							onClick={() => {
								inputDigit(8);
							}}>
							8
						</CalculatorKey>
						<CalculatorKey
							onClick={() => {
								inputDigit(9);
							}}>
							9
						</CalculatorKey>
					</div>
				</div>
				<div className={styles.operatorKeys}>
					<CalculatorKey
						onClick={() => {
							performOperation("/");
						}}>
						÷
					</CalculatorKey>
					<CalculatorKey
						className={styles.keyMultiply}
						onClick={() => {
							performOperation("*");
						}}>
						×
					</CalculatorKey>
					<CalculatorKey
						onClick={() => {
							performOperation("-");
						}}>
						−
					</CalculatorKey>
					<CalculatorKey
						onClick={() => {
							performOperation("+");
						}}>
						+
					</CalculatorKey>
					<CalculatorKey
						onClick={() => {
							performOperation("=");
						}}>
						=
					</CalculatorKey>
				</div>
			</div>
		</div>
	);
};

export default Calculator;
