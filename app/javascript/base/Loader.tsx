import React, {FunctionComponent} from 'react';
import logo from '../../assets/images/logo.svg';
import I18n from "i18n-js";

const Loader: FunctionComponent = () => (
    <div id={'loader'}>
        <img  src={logo} alt={I18n.t('ui.loading')} />
    </div>
);

export default Loader;
