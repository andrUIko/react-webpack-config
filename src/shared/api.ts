function client(
    endpoint: string,
    {
        data,
        token,
        headers: customHeaders,
        ...customConfig
    }: RequestInit & { data?: any; token?: string } = {}
) {
    const config = {
        method: data ? "POST" : "GET",
        body: data ? JSON.stringify(data) : undefined,
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(data && { "Content-Type": "application/json" }),
            ...customHeaders,
        },
        ...customConfig,
    };
    return fetch(`/${endpoint}`, config).then(async (response) => {
        const responseData: any = await response.json();

        if (response.ok) {
            return responseData;
        } else {
            return Promise.reject(responseData);
        }
    });
}

const savePost = (postData: any) =>
    client(`post/${postData.id}`, { data: postData });
const loadGreeting = (subject: string) =>
    client(`greeting`, { data: { subject } });
const reportError = (data: any, info?: React.ErrorInfo) =>
    client(`error`, { data });
const submitForm = (data: any) => client(`form`, { data });

export { savePost, loadGreeting, reportError, submitForm };
