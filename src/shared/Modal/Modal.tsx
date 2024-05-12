import ReactDOM from "react-dom";
import { useRef, useLayoutEffect } from "react";

let modalRoot = document.getElementById("modal-root");
if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
}

function Modal({ children }: { children: React.ReactNode }) {
    const el = useRef(document.createElement("div"));
    useLayoutEffect(() => {
        const currentEl = el.current;
        if (!modalRoot) return;
        modalRoot.appendChild(currentEl);
        return () => {
            modalRoot.removeChild(currentEl);
        };
    }, []);
    return ReactDOM.createPortal(children, el.current);
}

export { Modal };
