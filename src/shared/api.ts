const sleep = (time: number) =>
    new Promise((resolve) => {
        setTimeout(resolve, time);
    });

async function savePost(postData: any) {
    await sleep(1000);
    return { data: { post: postData } };
}

const greetings = ["Hello", "Hi", "Hey there", `What's up`, "Howdy", `G'day`];

async function loadGreeting(subject: string) {
    return { data: { greeting: `${await fetchRandomGreeting()} ${subject}` } };
}

async function fetchRandomGreeting() {
    await sleep(1000);
    return greetings[Math.floor(Math.random() * greetings.length)];
}

async function reportError() {
    await sleep(1000);
    return { success: true };
}

async function submitForm() {
    await sleep(1000);
    return { success: true };
}

export { savePost, loadGreeting, reportError, submitForm };
