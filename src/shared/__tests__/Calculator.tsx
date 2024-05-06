import { render } from "test-utils.tsx";
import "@testing-library/jest-dom";
import Calculator from "shared/Calculator/Calculator.tsx";
import React from "react";
import userEvent from "@testing-library/user-event";

test("the clear button switches from AC to C when there is an entry", () => {
    const { getByText } = render(<Calculator />);
    const clearButton = getByText("AC");

    userEvent.click(getByText(/3/));
    expect(clearButton).toHaveTextContent("C");

    userEvent.click(clearButton);
    expect(clearButton).toHaveTextContent("AC");
});
