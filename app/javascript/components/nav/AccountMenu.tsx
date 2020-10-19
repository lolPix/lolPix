import React, {FunctionComponent} from 'react';
import User from "../../model/user";
import I18n from "i18n-js";

type Props = {
    account: User,
}

const AccountMenu: FunctionComponent<Props> = ({account}: Props) => {
    const profilePictureAlt = I18n.t('nav.alt_profile_picture_for') + ' ' + account.username;
    return (
        <ul className={'account-menu'}>
            <li className={'top'}>
                <img src={account.imageUrl} alt={profilePictureAlt}/>
                <span>{account.username}</span>
            </li>
        </ul>
    );
};

export default AccountMenu;