import AutoScalingText from "shared/AutoScalingText/AutoScalingText.tsx";
import { render } from "test-utils.tsx";
import React from "react";

test("renders", () => {
	const {
		// debug,
		getAllByTestId,
	} = render(<AutoScalingText>Hello</AutoScalingText>);
	// debug();
	expect(getAllByTestId("total")).toHaveLength(1);
});
