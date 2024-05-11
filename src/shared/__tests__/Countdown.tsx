import React from "react";
import { render, act } from "@testing-library/react";
import { Countdown } from "shared/Countdown/Countdown.tsx";

beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
    (console.error as jest.Mock).mockRestore();
});

afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
});

test("does not attempt to set state when unmounted (to prevent memory leaks)", () => {
    jest.useFakeTimers();
    const { unmount } = render(<Countdown />);
    unmount();
    act(() => jest.runOnlyPendingTimers());
    expect(console.error).not.toHaveBeenCalled();
});
