import React from "react";
import userEvent from "@testing-library/user-event";
import { Counter } from "shared/Counter/Counter.tsx";
import { render, screen, waitFor } from "test-utils.tsx";

test("can increment the value", () => {
    render(<Counter />);
    userEvent.click(screen.getByText("+"));
    waitFor(() =>
        expect(screen.getByLabelText(/count/i)).toHaveTextContent("1")
    );
});

test("can decrement the value", () => {
    render(<Counter />, {
        initialState: {
            counter: { value: 3 },
        },
    });
    userEvent.click(screen.getByText("-"));
    waitFor(() =>
        expect(screen.getByLabelText(/count/i)).toHaveTextContent("2")
    );
});
