import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App";
import I18n from "i18n-js";
import Api from "./Api";
import User from "../model/User";

async function fetchUser() {
    const ssruser: User = {
        bio: document.getElementById('app').dataset.ssruserBio,
        id: parseInt(document.getElementById('app').dataset.ssruserId, 10),
        username: document.getElementById('app').dataset.ssruserUsername,
        image: document.getElementById('app').dataset.ssruserImage,
        admin: document.getElementById('app').dataset.ssruserAdmin === 'true'
    };
    console.log('Serverside user in client: ' + JSON.stringify(ssruser))
    if (ssruser) {
        console.log('Using SSR user...')
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
document.addEventListener('DOMContentLoaded', () => {
    Promise.all([fetchUser()]).then(([user]) => {
        ReactDOM.render(<App account={user}/>, document.getElementById('app'));
    });
});
