import React, {FunctionComponent} from 'react';

type NavMenuProps = {

}

const NavBarMenu: FunctionComponent<NavMenuProps> = (props: NavMenuProps) => (
    <ul className={'nav-menu'}>
        <li>Home</li>
        <li>Memes</li>
        <li>Fails</li>
        <li>GIFs</li>
    </ul>
);

export default NavBarMenu;