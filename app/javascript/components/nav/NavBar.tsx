import React, {FunctionComponent} from 'react';
import User from "../../model/user";
import Logo from "./Logo";
import NavBarMenu from "./NavBarMenu";
import AccountMenu from "./AccountMenu";

type NavBarProps = {
    showLogo: boolean,
    account: User|undefined,
}

const NavBar: FunctionComponent<NavBarProps> = (props: NavBarProps) => (
    <div id={'navbar'}>
        {props.showLogo && <Logo/>}
        <NavBarMenu />
        {props.account && <AccountMenu account={props.account} />}
    </div>
);

export default NavBar;
