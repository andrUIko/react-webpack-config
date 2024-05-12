import AutoScalingText from "shared/AutoScalingText/AutoScalingText.tsx";
import { render } from "test-utils.tsx";

test("renders", () => {
    const { getAllByTestId } = render(<AutoScalingText>Hello</AutoScalingText>);
    expect(getAllByTestId("total")).toHaveLength(1);
});
