import {FunctionComponent} from 'react';

const LogoutPage: FunctionComponent = () => {
    localStorage.setItem('lolPix_Token', '');
    setTimeout(() => window.location.href = '/', 150);
    return null;
}
export default LogoutPage;
