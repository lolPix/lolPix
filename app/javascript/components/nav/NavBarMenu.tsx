import React, {FunctionComponent} from 'react';
import I18n from "i18n-js";
import {NavLink} from 'react-router-dom';

type NavMenuProps = {

}

const NavBarMenu: FunctionComponent<NavMenuProps> = (props: NavMenuProps) => (
   props &&
   <ul className={'nav-menu'}>
       <li><NavLink to={'/'} >{I18n.t('ui.nav.home')}</NavLink></li>
       <li><NavLink to={'/memes'}>{I18n.t('ui.nav.memes')}</NavLink></li>
       <li><NavLink to={'/fails'}>{I18n.t('ui.nav.fails')}</NavLink></li>
       <li><NavLink to={'/gifs'}>{I18n.t('ui.nav.gifs')}</NavLink></li>
   </ul>
);

export default NavBarMenu;