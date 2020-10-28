import React, {FunctionComponent} from 'react';
import {Redirect} from 'react-router-dom';

const LogoutPage: FunctionComponent = () => {
    console.log('deleting token...')
    localStorage.setItem('lolPix_Token', '');
    console.log('setting url...')
    return <Redirect to={'/'} />;
}

export default LogoutPage;
