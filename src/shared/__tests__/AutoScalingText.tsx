import { render } from "@testing-library/react";
import AutoScalingText from "../AutoScalingText/AutoScalingText.tsx";

test("renders", () => {
	const { debug, getAllByTestId } = render(<AutoScalingText />);
	debug();
	expect(getAllByTestId("total")).toHaveLength(1);
});
