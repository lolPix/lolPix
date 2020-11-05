import I18n from "i18n-js";
import 'isomorphic-fetch';

type ApiProps = {
    path: string,
    method?: "GET" | "POST" | "DELETE",
    headers?: HeadersInit,
    body?: BodyInit
}

function Api({path, method = "GET", headers = {}, body}: ApiProps): Promise<Response> {
    const fetchUrl = '/api/v1' + (path.startsWith('/') ? '' : '/') + path;
    console.log(I18n.t('console.fetching_api') + fetchUrl + '"...')

    let token = undefined;
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem('lolPix_Token');
        return fetch(fetchUrl, {
            method,
            headers: {...headers, 'Authorization': 'Bearer ' + token},
            body
        });
    } else {
        // assume we're in SSR mode
        return fetch(fetchUrl, {
            method,
            headers: {...headers},
            body
        });
    }
}

export default Api;
