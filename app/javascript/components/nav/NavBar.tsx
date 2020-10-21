import React, {FunctionComponent} from 'react';
import User from "../../model/user";
import Logo from "./Logo";
import NavBarMenu from "./NavBarMenu";
import AccountMenu from "./AccountMenu";

type NavBarProps = {
    showLogo: boolean,
    account: User | undefined,
}

const NavBar: FunctionComponent<NavBarProps> = (props: NavBarProps) => (
    <div id={'navbar'}>
        <div>
            {props.showLogo && <Logo/>}
            <NavBarMenu/>
        </div>
        <AccountMenu account={props.account}/>
    </div>
);

export default NavBar;
