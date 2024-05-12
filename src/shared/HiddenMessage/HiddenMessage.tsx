import { CSSTransitionProps } from "react-transition-group/CSSTransition";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";

function Fade(props: Partial<CSSTransitionProps>) {
    return (
        <CSSTransition
            unmountOnExit
            timeout={1000}
            classNames="fade"
            {...props}
        />
    );
}

function HiddenMessage({ children }: { children: React.ReactNode }) {
    const [show, setShow] = useState(false);
    const toggle = () => setShow((s) => !s);
    return (
        <div>
            <button onClick={toggle}>Toggle</button>
            <Fade in={show}>
                <div>{children}</div>
            </Fade>
        </div>
    );
}

export { HiddenMessage };
