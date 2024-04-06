import { fireEvent, render } from "test-utils.tsx";
import "@testing-library/jest-dom";
import Calculator from "shared/Calculator/Calculator.tsx";
import React from "react";

test("the clear button switches from AC to C when there is an entry", () => {
	const { getByText } = render(<Calculator />);
	const clearButton = getByText("AC");

	fireEvent.click(getByText(/3/));
	expect(clearButton).toHaveTextContent("C");

	fireEvent.click(clearButton);
	expect(clearButton).toHaveTextContent("AC");
});
