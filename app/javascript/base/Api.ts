type ApiProps = {
    path: string,
    fetchOptions?: RequestInit | undefined,
}

function Api({path, fetchOptions}: ApiProps): Promise<Response> {
    return fetch('/api/v1/' + path, fetchOptions);
}

export default Api;
