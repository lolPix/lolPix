import React, {FunctionComponent} from 'react';
import User from "../model/user";

type Props = {
    account: User | undefined,
}

const Footer: FunctionComponent<Props> = ({account}: Props) => (
    <div id={'footer'}>
        &copy; 2020 lolPix {account && '- logged in as ' + account.username}
    </div>
);

export default Footer;