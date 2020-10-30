import React, {FunctionComponent} from 'react';
import {Redirect} from 'react-router-dom';

const LogoutPage: FunctionComponent = () => {
    console.log('deleting token...');
    localStorage.setItem('lolPix_Token', '');
    console.log('reloading...');
    if(new URLSearchParams(window.location.search).get('reload') !== 'false') {
        window.location.href = '/logout&reload=false';
    }
    return <Redirect to={'/'} />;
}

export default LogoutPage;
