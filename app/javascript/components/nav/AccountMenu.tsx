import React, {FunctionComponent, useState} from 'react';
import User from "../../model/user";
import I18n from "i18n-js";
import {Link} from 'react-router-dom';
import defaultPicture from '../../../assets/images/logo_grey.svg';

type Props = {
    account: User | undefined,
}

const AccountMenu: FunctionComponent<Props> = ({account}: Props) => {
    const [active, setActive] = useState(false);

    const unauthenticatedMenu = <ul className={'account-menu__menu'}>
        <li>
            <Link to={'/login'}>{I18n.t('ui.nav.account.login')}</Link>
        </li>
        <li>
            <Link to={'/register'}>{I18n.t('ui.nav.account.register')}</Link>
        </li>
    </ul>;

    return (
        <div className={'account-menu' + (active ? ' active' : '')}>
            <div className={'top'} onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActive(!active);
            }}>
                {(account && <>
                    {account.image && <img src={account.image} alt={I18n.t('nav.alt_profile_picture_for') + ' ' + account.username}/>
                    || <img src={defaultPicture} alt={I18n.t('error.no_image_found')} />}
                    <span>{account.username}</span>
                </>) || <span>{I18n.t('ui.nav.account.not_logged_in')}</span>}
            </div>
            {!account && unauthenticatedMenu ||
            <ul className={'account-menu__menu'}>
                <li>
                    <Link to={'/user/' + account.username}>{I18n.t('ui.nav.account.profile')}</Link>
                </li>
                <li>
                    <Link to={'/logout'}>{I18n.t('ui.nav.account.logout')}</Link>
                </li>
            </ul>}
        </div>
    );
};

export default AccountMenu;