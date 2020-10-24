import React, {FunctionComponent} from 'react';
import User from "../model/user";
import {Redirect} from 'react-router-dom';
import I18n from "i18n-js";

type Props = {
    account: User | undefined,
}
const HomePage: FunctionComponent<Props> = ({account}: Props) => (
    (account && <h1>{I18n.t('ui.heading.home')}</h1>) || <Redirect to={'/login'}/>
);

export default HomePage;
