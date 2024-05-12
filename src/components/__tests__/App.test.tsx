import { render, waitFor } from "test-utils.tsx";
import userEvent from "@testing-library/user-event";
import App from "components/App/App.tsx";

test("App renders about and home and I can navigate to those pages", async () => {
    const { findByRole, findByText } = render(<App />);
    expect(await findByRole("heading")).toHaveTextContent(/hello/i);
    userEvent.click(await findByText(/about/i));
    waitFor(async () =>
        expect(await findByRole("heading")).toHaveTextContent(/about/i)
    );
});

test("landing on a bad page shows no match component", async () => {
    const { findByRole } = render(<App />, { path: "/not-a-page" });
    expect(await findByRole("heading")).toHaveTextContent(/404/i);
});
