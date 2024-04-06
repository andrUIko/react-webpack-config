import CalculatorDisplay from "shared/CalculatorDisplay/CalculatorDisplay.tsx";
import { render } from "test-utils.tsx";
import React from "react";

test("renders", () => {
	const { container } = render(<CalculatorDisplay value="0" />);
	expect(container.firstChild).toMatchInlineSnapshot(`
		<div
		  style="position: relative; color: white; background: rgb(28, 25, 28); line-height: 130px; font-size: 6em; flex: 1;"
		>
		  <div
		    class="autoScalingText"
		    data-testid="total"
		    style="transform: scale(1,1);"
		  >
		    0
		  </div>
		</div>
	`);
});
