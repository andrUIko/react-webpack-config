import React from "react";
import { HiddenMessage } from "shared/HiddenMessage/HiddenMessage.tsx";
import userEvent from "@testing-library/user-event";
import { act, render, screen } from "test-utils.tsx";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

jest.mock("react-transition-group", () => {
    return {
        CSSTransition: (props: Partial<CSSTransitionProps>) =>
            props.in ? props.children : null,
    };
});

test("shows hidden message when toggle is clicked", async () => {
    const myMessage = "hello world";
    render(<HiddenMessage>{myMessage}</HiddenMessage>);
    const toggleButton = screen.getByText(/toggle/i);
    expect(screen.queryByText(myMessage)).not.toBeInTheDocument();
    await act(() => userEvent.click(toggleButton));
    expect(screen.getByText(myMessage)).toBeInTheDocument();
    await act(() => userEvent.click(toggleButton));
    expect(screen.queryByText(myMessage)).not.toBeInTheDocument();
});
