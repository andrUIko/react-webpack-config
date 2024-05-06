import * as React from "react";
import { render, screen, waitFor } from "test-utils.tsx";
import userEvent from "@testing-library/user-event";
import { reportError as mockReportError } from "../api.ts";
import { ErrorBoundary } from "shared/ErrorBoundary/ErrorBoundary.tsx";

jest.mock("../api.ts");

beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
    (console.error as jest.Mock).mockRestore();
});

afterEach(() => {
    jest.clearAllMocks();
});

function Bomb({ shouldThrow }: { shouldThrow?: boolean }) {
    if (shouldThrow) {
        throw new Error("💣");
    } else {
        return null;
    }
}

test("calls reportError and renders that there was a problem", async () => {
    (mockReportError as jest.Mock).mockResolvedValueOnce({ success: true });
    const { rerender, findByRole, findByText } = render(<Bomb />, {
        wrapper: ErrorBoundary,
    });

    rerender(<Bomb shouldThrow />);

    const error = expect.any(Error);
    const info = { componentStack: expect.stringContaining("ErrorBoundary") };
    expect(mockReportError).toHaveBeenCalledWith(error, info);
    expect(mockReportError).toHaveBeenCalledTimes(1);

    expect(console.error).toHaveBeenCalledTimes(3);

    expect((await findByRole("alert")).textContent).toMatchInlineSnapshot(
        `"There was a problem."`
    );

    (console.error as jest.Mock).mockClear();
    (mockReportError as jest.Mock).mockClear();

    rerender(<Bomb />);

    userEvent.click(await findByText(/try again/i));
    waitFor(() => {
        expect(mockReportError).not.toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
        expect(screen.queryByText(/try again/i)).not.toBeInTheDocument();
    });
});
