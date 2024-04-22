import React from "react";
import { act, render } from "test-utils.tsx";
import { GreetingLoader } from "shared/Greeting/Greeting.tsx";
import user from "@testing-library/user-event";
import { loadGreeting as mockLoadGreeting } from "../api.ts";

jest.mock("../api.ts");

test("loads greetings on click", async () => {
    const testGreeting = "TEST_GREETING";

    (mockLoadGreeting as jest.Mock).mockResolvedValueOnce({
        data: { greeting: testGreeting },
    });

    const { getByLabelText, getByText } = render(<GreetingLoader />);
    const nameInput = getByLabelText(/name/i) as HTMLInputElement;
    const loadButton = getByText(/load/i);
    nameInput.value = "Mary";

    await act(() => user.click(loadButton));

    expect(mockLoadGreeting).toHaveBeenCalledWith("Mary");
    expect(mockLoadGreeting).toHaveBeenCalledTimes(1);
    expect(getByLabelText(/greeting/i)).toHaveTextContent(testGreeting);
});
