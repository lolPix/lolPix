import {FunctionComponent} from 'react';

const LogoutPage: FunctionComponent = () => {
    localStorage.setItem('lolPix_Token', '');
    window.location.href = '/';
    return null;
}
export default LogoutPage;
