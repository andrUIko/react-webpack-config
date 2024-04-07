import { getFormattedValue } from "shared/utils.ts";
import AutoScalingText from "shared/AutoScalingText/AutoScalingText.tsx";
import React from "react";

interface CalculatorDisplayProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    children?: React.ReactNode;
    value: string;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({
    value,
    ...props
}) => {
    const formattedValue = getFormattedValue(
        value,
        typeof window === "undefined" ? "en-US" : window.navigator.language
    );

    return (
        <div
            {...props}
            style={{
                position: "relative",
                color: "white",
                background: "#1c191c",
                lineHeight: "130px",
                fontSize: "6em",
                flex: "1",
            }}>
            <AutoScalingText>{formattedValue}</AutoScalingText>
        </div>
    );
};

export default CalculatorDisplay;
