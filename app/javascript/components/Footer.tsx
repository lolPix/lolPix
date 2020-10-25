import React, {FunctionComponent} from 'react';
import User from "../model/user";
import I18n from "i18n-js";
import {Link} from "react-router-dom";

type Props = {
    account: User | undefined,
}

const Footer: FunctionComponent<Props> = ({account}: Props) => {
    const accountFragment = (
        <p className={'secondary'}>
            {'logged in as ' + account.username}
            &nbsp;
            <Link to={'/logout'}>({I18n.t('ui.footer.logout')})</Link>
        </p>
    );

    return (
        <div id={'footer'}>
            <p>&copy; 2020 lolPix</p>
            {account && accountFragment}
        </div>
    );
};

export default Footer;