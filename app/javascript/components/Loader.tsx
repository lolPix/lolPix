import React, {FunctionComponent} from 'react';
import ReactDOM from 'react-dom';
import logo from '../../assets/images/logo.svg';
import I18n from "i18n-js";

const Loader: FunctionComponent = () => (
    ReactDOM.createPortal(<div id={'loader'}>
        <img  src={logo} alt={I18n.t('ui.loading')} />
    </div>, document.getElementById('overlay'))
);

export default Loader;
