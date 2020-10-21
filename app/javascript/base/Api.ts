type ApiProps = {
    path: string,
    method?: "GET" | "POST",
    headers?: HeadersInit,
    body?: BodyInit
}

function Api({path, method = "GET", headers = {}, body}: ApiProps): Promise<Response> {
    const fetchUrl = '/api/v1' + (path.startsWith('/') ? '' : '/') + path;
    console.log('Fetching: "' + fetchUrl + '"...')
    const token = localStorage.getItem('lolPix_Token');
    return fetch(fetchUrl, {
        method,
        headers: {...headers, 'Authorization': 'Bearer ' + token},
        body
    });
}

export default Api;
