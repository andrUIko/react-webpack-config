import React from "react";
import { axe } from "jest-axe";
import { AccessibleForm } from "shared/Forms/Forms.tsx";
import { render } from "test-utils.tsx";

test("accessible forms pass axe", async () => {
    const { container } = render(<AccessibleForm />);
    expect(await axe(container)).toHaveNoViolations();
});
