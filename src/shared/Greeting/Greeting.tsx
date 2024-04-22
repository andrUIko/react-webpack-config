import React from "react";
import { loadGreeting } from "../api.ts";

function GreetingLoader() {
    const [greeting, setGreeting] = React.useState("");

    async function loadGreetingForInput(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!(e.target instanceof HTMLFormElement)) return;
        const input = e.target.elements.namedItem("name") as HTMLInputElement;

        const { data } = await loadGreeting(input.value);
        setGreeting(data.greeting);
    }
    return (
        <form onSubmit={loadGreetingForInput}>
            <label htmlFor="name">Name</label>
            <input id="name" />
            <button type="submit">Load Greeting</button>
            <div aria-label="greeting">{greeting}</div>
        </form>
    );
}

export { GreetingLoader };
