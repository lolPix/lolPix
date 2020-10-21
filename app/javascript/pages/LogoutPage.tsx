import React, {FunctionComponent} from 'react';

type Props = {}

const LogoutPage: FunctionComponent<Props> = ({}: Props) => {
    localStorage.setItem('lolPix_Token', '');
    window.location.href = '/';
}
export default LogoutPage;