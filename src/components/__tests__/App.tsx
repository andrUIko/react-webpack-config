import React from "react";
import { render, waitFor } from "test-utils.tsx";
import userEvent from "@testing-library/user-event";
import App from "components/App/App.tsx";

test("App renders about and home and I can navigate to those pages", () => {
    const { getByRole, getByText } = render(<App />);
    waitFor(() => expect(getByRole("heading")).toHaveTextContent(/hello/i));
    userEvent.click(getByText(/about/i));
    waitFor(() => expect(getByRole("heading")).toHaveTextContent(/about/i));
});

test("landing on a bad page shows no match component", () => {
    const { getByRole } = render(<App />, { path: "/not-a-page" });
    waitFor(() => expect(getByRole("heading")).toHaveTextContent(/404/i));
});
