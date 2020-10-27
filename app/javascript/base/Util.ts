/* eslint-disable */
/* stolen from https://gist.github.com/nmsdvid/8807205 */
export function debounce(func: any, wait: number, immediate: boolean) {
    let timeout;
    return function(...params) {
        const context = this, args = params;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
}
