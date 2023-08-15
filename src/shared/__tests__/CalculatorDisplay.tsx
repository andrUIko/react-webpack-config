import { render } from "@testing-library/react";
import CalculatorDisplay from "../CalculatorDisplay/CalculatorDisplay.tsx";

test("renders", () => {
	const { container } = render(<CalculatorDisplay value="0" />);
	expect(container.firstChild).toMatchInlineSnapshot(`
		<div
		  style="position: relative; color: white; background: rgb(28, 25, 28); line-height: 130px; font-size: 6em; flex: 1;"
		>
		  <div
		    class="AutoScalingText"
		    data-testid="total"
		    style="transform: scale(1,1);"
		  >
		    0
		  </div>
		</div>
	`);
});
