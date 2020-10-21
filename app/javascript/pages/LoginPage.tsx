import React, {Dispatch, FunctionComponent, SetStateAction} from 'react';
import NavBar from "../components/nav/NavBar";
import User from "../model/user";
import LoginForm from "../components/LoginForm";

type Props = {
    account: User | undefined,
    toggleReload: Dispatch<SetStateAction<boolean>>,
}

const LoginPage: FunctionComponent<Props> = ({account, toggleReload}: Props) => (
    <div className={'wrapper'}>
        <NavBar showLogo={true} account={account}/>
        <LoginForm toggleReload={toggleReload} />
    </div>
);

export default LoginPage;
