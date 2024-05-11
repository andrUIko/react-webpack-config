import React from "react";
import { Modal } from "shared/Modal/Modal.tsx";
import { render, within } from "test-utils.tsx";

test("modal shows the children", () => {
    render(
        <Modal>
            <div data-testid="test" />
        </Modal>
    );
    const root = document.getElementById("modal-root");
    if (!root) throw new Error("root not found");

    const { getByTestId } = within(root);

    expect(getByTestId("test")).toBeInTheDocument();
});
