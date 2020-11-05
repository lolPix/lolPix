import I18n from "i18n-js";
import Post from "../model/Post";

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

/**
 * Utility function that returns the i18n name for a
 * category or undefined in case the category is not known.
 *
 * @param post the post to get the category for
 */
export function getCategoryString(post: Post): string | undefined {
    switch (post.category) {
        case 0:
            return I18n.t('ui.post.category.meme');
        case 1:
            return I18n.t('ui.post.category.fail');
        case 2:
            return I18n.t('ui.post.category.gif');
        default:
            return undefined;
    }
}

/**
 * Method that copies text to clipboard.
 */
export function copyToClipboard(text: string): unknown {
    const textarea = document.createElement('textarea');
    textarea.style.cssText = 'position: absolute; left: -99999em';
    textarea.setAttribute('readonly', String(true));
    document.body.appendChild(textarea);
    textarea.value = text;
    const selected = document.getSelection().rangeCount > 0 ?
        document.getSelection().getRangeAt(0) : false;

    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        // https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios
        const editable = textarea.contentEditable;
        textarea.contentEditable = String(true);
        const range = document.createRange();
        range.selectNodeContents(textarea);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        textarea.setSelectionRange(0, 999999);
        textarea.contentEditable = editable;
    } else {
        textarea.select();
    }

    try {
        const result = document.execCommand('copy');
        if (selected) {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(selected);
        }
        return result;
    } catch (err) {
        console.error(err);
        return false;
    }
}
