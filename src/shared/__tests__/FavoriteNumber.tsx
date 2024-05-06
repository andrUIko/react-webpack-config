import React from "react";
import { FavoriteNumber } from "shared/FavoriteNumber/FavoriteNumber.tsx";
import { render, screen, waitFor } from "test-utils.tsx";
import user from "@testing-library/user-event";

test('renders a number input with a label "Favorite Number"', async () => {
    render(<FavoriteNumber />);

    const input = await screen.findByLabelText(/favorite number/i);
    expect(input).toHaveAttribute("type", "number");

    expect(
        await screen.findByTestId("favorite-number-label")
    ).toHaveTextContent("Favorite Number");
});

test("entering an invalid value shows an error message", async () => {
    const { findByLabelText, findByRole, rerender, queryByRole } = render(
        <FavoriteNumber />
    );
    const input = await findByLabelText(/favorite number/i);
    user.type(input, "10");
    await waitFor(async () =>
        expect(await findByRole("alert")).toHaveTextContent(
            /the number is invalid/i
        )
    );
    rerender(<FavoriteNumber max={10} />);
    expect(queryByRole("alert")).toBeNull();
});
