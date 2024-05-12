import { render } from "test-utils.tsx";
import "@testing-library/jest-dom";
import Calculator from "shared/Calculator/Calculator.tsx";
import userEvent from "@testing-library/user-event";

test("the clear button switches from AC to C when there is an entry", async () => {
    const { findByText } = render(<Calculator />);
    const clearButton = await findByText("AC");

    userEvent.click(await findByText(/3/));
    expect(clearButton).toHaveTextContent("C");

    userEvent.click(clearButton);
    expect(clearButton).toHaveTextContent("AC");
});
