import React, {FunctionComponent, useState} from 'react';
import User from "../../model/user";
import I18n from "i18n-js";
import {Link} from 'react-router-dom';

type Props = {
    account: User | undefined,
}

const AccountMenu: FunctionComponent<Props> = ({account}: Props) => {
    const [active, setActive] = useState(false);

    return (
        <div className={'account-menu' + (active ? ' active' : '')}>
            <div className={'top'} onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActive(!active);
            }}>
                {account && <>
                    <img src={account.imageUrl} alt={I18n.t('nav.alt_profile_picture_for') + ' ' + account.username}/>
                    <span>{account.username}</span>
                </>}
                <span>{I18n.t('ui.nav.account.not_logged_in')}</span>
            </div>
            {!account && <ul className={'account-menu__menu'}>
                <li>
                    <Link to={'/login'}>{I18n.t('ui.nav.account.login')}</Link>
                </li>
                <li>
                    <Link to={'/register'}>{I18n.t('ui.nav.account.register')}</Link>
                </li>
            </ul>}
        </div>
    );
};

export default AccountMenu;