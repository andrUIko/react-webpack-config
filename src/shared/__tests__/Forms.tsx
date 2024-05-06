import React from "react";
import { axe } from "jest-axe";
import { AccessibleForm } from "shared/Forms/Forms.tsx";
import { act, render, waitFor } from "test-utils.tsx";
import userEvent from "@testing-library/user-event";
import { savePost } from "../api";
import { redirect } from "react-router-dom";
import { build, sequence } from "@jackfranklin/test-data-bot";
import { faker } from "@faker-js/faker";

const postBuilder = build("post", {
    fields: {
        title: faker.lorem.words(),
        content: faker.lorem.paragraphs(),
        tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
    },
});

const userBuilder = build("user", {
    fields: {
        id: sequence((s) => `user-${s}`),
    },
});

jest.mock("../api");
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    redirect: jest.fn(() => null),
}));

const mockSavePost = savePost as jest.MockedFn<typeof savePost>;
const mockRedirect = redirect as jest.MockedFn<typeof redirect>;

afterEach(() => {
    jest.clearAllMocks();
});

test("accessible forms pass axe", async () => {
    const { container } = render(<AccessibleForm user={{ id: "user-1" }} />);
    expect(await axe(container)).toHaveNoViolations();
});

const renderFunction = async () => {
    const fakeUser = userBuilder();
    const fakePost = postBuilder();
    const { findByLabelText, findByText, ...utils } = render(
        <AccessibleForm user={fakeUser} />
    );

    const title = await findByLabelText(/title/i);
    const content = await findByLabelText(/content/i);
    const tags = await findByLabelText(/tags/i);
    const submitButton = await findByText(/submit/i);

    if (title instanceof HTMLInputElement) {
        title.value = fakePost.title;
    }
    if (content instanceof HTMLTextAreaElement) {
        content.value = fakePost.content;
    }
    if (tags instanceof HTMLInputElement) {
        tags.value = fakePost.tags.join(", ");
    }

    return {
        ...utils,
        findByText,
        findByLabelText,
        title,
        content,
        tags,
        submitButton,
        fakeUser,
        fakePost,
    };
};

test("renders a form with title, content, tags, and a submit button", async () => {
    mockSavePost.mockResolvedValueOnce({});

    const { submitButton, fakePost, fakeUser } = await renderFunction();

    const preDate = +new Date();
    await act(() => userEvent.click(submitButton));
    const postDate = +new Date();

    expect(submitButton).toBeDisabled();

    expect(mockSavePost).toHaveBeenCalledWith({
        ...fakePost,
        authorId: fakeUser.id,
        date: expect.any(String),
    });

    const date = +new Date(mockSavePost.mock.calls[0]?.[0]?.["date"]);

    expect(mockSavePost).toHaveBeenCalledTimes(1);
    expect(mockRedirect).toHaveBeenCalledWith("/");
    expect(mockRedirect).toHaveBeenCalledTimes(1);
    expect(date).toBeGreaterThanOrEqual(preDate);
    expect(date).toBeLessThanOrEqual(postDate);
});

test("renders an error message from the server", async () => {
    const TEST_ERROR = "test error";

    mockSavePost.mockRejectedValueOnce({ data: { error: TEST_ERROR } });

    const { findByRole, findByText } = await renderFunction();
    const submitButton = await findByText(/submit/i);
    userEvent.click(submitButton);
    waitFor(async () => {
        expect(await findByRole("alert")).toHaveTextContent(TEST_ERROR);
        expect(submitButton).not.toBeDisabled();
    });
});
