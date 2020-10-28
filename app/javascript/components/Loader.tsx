import React, {FunctionComponent} from 'react';
import ReactDOM from 'react-dom';
import logo from '../../assets/images/logo.svg';
import I18n from "i18n-js";

const Loader: FunctionComponent = () => {
    const safe_document = typeof document === 'undefined' ? '' : document;
    if(safe_document !== '') {
        return (ReactDOM.createPortal(<div id={'loader'}>
            <img  src={logo} alt={I18n.t('ui.loading')} />
        </div>, safe_document.getElementById('overlay')))
    } else {
        return null;
    }
};

export default Loader;
