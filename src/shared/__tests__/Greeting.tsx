import React from "react";
import { act, render, waitFor } from "test-utils.tsx";
import { GreetingLoader } from "shared/Greeting/Greeting.tsx";
import user from "@testing-library/user-event";
import { setupServer } from "msw/node";

import { http, HttpResponse } from "msw";

const handlers = [
    http.post("/greeting", async ({ request }) => {
        const body = await request.json();
        if (!body || typeof body !== "object") return;
        if (!("subject" in body)) return;
        return HttpResponse.json({
            data: { greeting: `Hello ${body.subject}` },
        });
    }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
beforeEach(() => server.resetHandlers());

test("loads greetings on click", async () => {
    const { getByLabelText, getByText, debug } = render(<GreetingLoader />);
    const nameInput = getByLabelText(/name/i) as HTMLInputElement;
    const loadButton = getByText(/load/i);

    await user.type(nameInput, "Mary");
    await act(() => user.click(loadButton));

    await waitFor(() => {
        expect(getByLabelText(/greeting/i)).toHaveTextContent("Hello Mary");
    });
});
