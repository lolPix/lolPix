import React, {FunctionComponent} from 'react';
import User from "../model/user";
import {Redirect} from 'react-router-dom';
import I18n from "i18n-js";

type Props = {
    account: User | undefined,
}
const HomePage: FunctionComponent<Props> = ({account}: Props) => (
    (account && <div className={'home-page'}>
        <h1 className={'page-heading'}>{I18n.t('ui.heading.home')}</h1>
        <p>Welcome to the lolPix homepage.</p>
        <p>There is no real reason this page exists. It will probably be deleted at a later point in time
            (which is the reason this text is hardcoded and not in I18N).</p>
    </div>) || <Redirect to={'/login'}/>
);

export default HomePage;
