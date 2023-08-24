import { getFormattedValue } from "shared/utils.ts";

test("formats the value", () => {
	expect(getFormattedValue("1234.0")).toBe("1,234.0");
});
