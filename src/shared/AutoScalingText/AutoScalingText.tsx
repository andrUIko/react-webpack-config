import React, { useRef } from "react";
import styles from "./AutoScalingText.module.scss";

interface AutoScalingTextProps {
    children: React.ReactNode;
}

const getScale = (node: HTMLDivElement | null) => {
    if (!node) return 1;

    // eslint-disable-next-line no-debugger
    debugger;
    const parentNode = node.parentNode;
    if (!(parentNode instanceof HTMLElement)) return 1;
    if (Object.getPrototypeOf(parentNode) !== HTMLElement) return 1;
    const availableWidth = parentNode.offsetWidth;
    const actualWidth = node.offsetWidth;
    const actualScale = availableWidth / actualWidth;
    if (actualScale < 1) {
        return actualScale * 0.9;
    }
    return 1;
};

const AutoScalingText: React.FC<AutoScalingTextProps> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);

    const scale = getScale(ref.current);
    return (
        <div
            className={styles.autoScalingText}
            data-testid="total"
            style={{ transform: `scale(${scale},${scale})` }}
            ref={ref}>
            {children}
        </div>
    );
};

export default AutoScalingText;
