import I18n from "i18n-js";

/**
 * Utility function to extract the "next page" link from the APIs pagination responses.
 *
 * @param res the response received from the API
 * @param setNextLink the state method for the next link in the component
 */
export function extractNextPageLink(res: Response, setNextLink: (nextLink: string) => void): void {
    const nextPageLinkMatch = res.headers.get('Link').match(/<([^<>]*)>; rel="next"/)
    if (nextPageLinkMatch && nextPageLinkMatch[1]) {
        const nextPageLink = nextPageLinkMatch[1];
        console.log(I18n.t('console.found_next_link') + nextPageLink) // TODO: do something with pagination
        setNextLink(nextPageLink);
    } else {
        console.log(I18n.t('console.warning.no_next_link_found'))
        setNextLink(undefined);
    }
}

/**
 * Method that generates random chars.
 * The idea is to get random values for Reacts 'key' property
 * that won't conflict with entity ids because they are numerical.
 *
 * @param length the length of the desired random string
 */
export function randomChars(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
