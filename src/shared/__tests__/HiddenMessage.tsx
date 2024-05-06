import React from "react";
import { HiddenMessage } from "shared/HiddenMessage/HiddenMessage.tsx";
import userEvent from "@testing-library/user-event";
import { render, waitFor } from "test-utils.tsx";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

jest.mock("react-transition-group", () => {
    return {
        CSSTransition: (props: Partial<CSSTransitionProps>) =>
            props.in ? props.children : null,
    };
});

test("shows hidden message when toggle is clicked", async () => {
    const myMessage = "hello world";
    const { findByText, queryByText } = render(
        <HiddenMessage>{myMessage}</HiddenMessage>
    );
    const toggleButton = await findByText(/toggle/i);
    expect(queryByText(myMessage)).not.toBeInTheDocument();
    userEvent.click(toggleButton);
    waitFor(async () =>
        expect(await findByText(myMessage)).toBeInTheDocument()
    );
    userEvent.click(toggleButton);
    waitFor(async () => expect(queryByText(myMessage)).not.toBeInTheDocument());
});
