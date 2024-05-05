import React from "react";
import { render } from "test-utils.tsx";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "routes.tsx";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

test("App renders about and home and I can navigate to those pages", async () => {
    const router = createMemoryRouter(routes, {
        initialEntries: ["/"],
    });

    const { getByRole, getByText } = await act(() =>
        render(<RouterProvider router={router} />)
    );

    expect(getByRole("heading")).toHaveTextContent(/hello/i);
    await act(() => userEvent.click(getByText(/about/i)));
    expect(getByRole("heading")).toHaveTextContent(/about/i);
});

test("landing on a bad page shows no match component", async () => {
    const router = createMemoryRouter(routes, {
        initialEntries: ["/incompatible-route"],
    });

    const { getByRole } = await act(() =>
        render(<RouterProvider router={router} />)
    );

    expect(getByRole("heading")).toHaveTextContent(/404/i);
});
