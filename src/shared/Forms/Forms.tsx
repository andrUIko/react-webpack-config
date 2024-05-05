import React from "react";
import { savePost } from "shared/api.ts";
import { redirect as routerRedirect } from "react-router-dom";

const validateError = (err: unknown): err is { data: { error: string } } => {
    return (
        err instanceof Object &&
        "data" in err &&
        err.data instanceof Object &&
        "error" in err.data &&
        typeof err.data.error === "string"
    );
};

function AccessibleForm({ user }: { user: { id: string } }) {
    const [isSaving, setIsSaving] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string>();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const { title, content, tags } = e.currentTarget
            .elements as HTMLFormControlsCollection &
            Record<string, HTMLInputElement | HTMLTextAreaElement>;

        const newPost = {
            title: title?.value,
            content: content?.value,
            tags: tags?.value.split(",").map((t) => t.trim()),
            authorId: user.id,
            date: new Date().toISOString(),
        };

        setIsSaving(true);

        try {
            await savePost(newPost);
            setRedirect(true);
        } catch (e) {
            setIsSaving(false);
            if (validateError(e)) setErrorMessage(e.data.error);
        }
    }

    if (redirect) routerRedirect("/");

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input id="username" placeholder="username" />

            <label htmlFor="title-input">Title</label>
            <input id="title-input" name="title" />

            <label htmlFor="content-input">Content</label>
            <textarea id="content-input" name="content" />

            <label htmlFor="tags-input">Tags</label>
            <input id="tags-input" name="tags" />

            <button type="submit" disabled={isSaving}>
                Submit
            </button>
            {errorMessage ? <div role="alert">{errorMessage}</div> : null}
        </form>
    );
}

export { AccessibleForm };
