import { Component } from "react";
import { reportError } from "../api";

class ErrorBoundary extends Component<{ children: React.ReactNode }> {
    state = { hasError: false };

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        this.setState({ hasError: true });
        reportError(error, info);
    }
    tryAgain = () => this.setState({ hasError: false });

    render() {
        return this.state.hasError ? (
            <div>
                <div role="alert">There was a problem.</div>{" "}
                <button onClick={this.tryAgain}>Try again?</button>
            </div>
        ) : (
            this.props.children
        );
    }
}

export { ErrorBoundary };
