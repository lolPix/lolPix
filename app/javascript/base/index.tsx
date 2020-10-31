import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App";
import I18n from "i18n-js";
import Api from "./Api";
import {extractSSRUser} from "./SSRDataExtractors";

async function fetchUser() {
    const ssruser = extractSSRUser();
    if (ssruser) {
        return ssruser;
    }
    const response = await Api({path: '/hi'});
    const user = await response.json();
    if (user && user.username && user.bio) {
        console.log(I18n.t('console.authorized') + JSON.stringify(user));
        return user;
    } else {
        console.error(I18n.t('console.error') + ' Unknown JSON returned: ' + JSON.stringify(user)) // TODO: error handling
        return undefined;
    }
}

/* React entrypoint */
let user = undefined;
document.addEventListener('DOMContentLoaded', () => {
    Promise.all([fetchUser()]).then(([u]) => {
        user = u;
    }).finally(() => {
        ReactDOM.render(<App account={user}/>, document.getElementById('app'), () => {
            console.log('Client side React initialized!');
        });
    });
});
