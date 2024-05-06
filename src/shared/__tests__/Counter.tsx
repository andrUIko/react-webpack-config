import React from "react";
import userEvent from "@testing-library/user-event";
import { Counter } from "shared/Counter/Counter.tsx";
import { render, waitFor } from "test-utils.tsx";

test("can increment the value", async () => {
    const { findByLabelText, findByText } = render(<Counter />);
    userEvent.click(await findByText("+"));
    waitFor(async () =>
        expect(await findByLabelText(/count/i)).toHaveTextContent("1")
    );
});

test("can decrement the value", async () => {
    const { findByText, findByLabelText } = render(<Counter />, {
        initialState: {
            counter: { value: 3 },
        },
    });
    userEvent.click(await findByText("-"));
    waitFor(async () =>
        expect(await findByLabelText(/count/i)).toHaveTextContent("2")
    );
});
