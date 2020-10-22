import I18n from "i18n-js";

type ApiProps = {
    path: string,
    method?: "GET" | "POST",
    headers?: HeadersInit,
    body?: BodyInit
}

function Api({path, method = "GET", headers = {}, body}: ApiProps): Promise<Response> {
    const fetchUrl = '/api/v1' + (path.startsWith('/') ? '' : '/') + path;
    console.log(I18n.t('console.fetching_api') + fetchUrl + '"...')
    const token = localStorage.getItem('lolPix_Token');
    return fetch(fetchUrl, {
        method,
        headers: {...headers, 'Authorization': 'Bearer ' + token},
        body
    });
}

export default Api;
