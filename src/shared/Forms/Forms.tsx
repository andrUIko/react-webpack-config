import React from "react";

function AccessibleForm() {
    return (
        <form>
            <label htmlFor="username">Username</label>
            <input id="username" placeholder="username" />
        </form>
    );
}

export { AccessibleForm };
