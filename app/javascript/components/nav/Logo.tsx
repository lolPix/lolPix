import React, {FunctionComponent} from 'react';
import logo from '../../../assets/images/logo.svg'
import I18n from "i18n-js";

type Props = {}

const Logo: FunctionComponent<Props> = () => (
    <div className={'logo'}>
        <img src={logo} alt={I18n.t('nav.alt_logo')}/>
    </div>
);

export default Logo;
