import React, {Dispatch, FunctionComponent, SetStateAction} from 'react';
import NavBar from "../components/nav/NavBar";
import User from "../model/user";
import LoginForm from "../components/form/LoginForm";

type Props = {
}

const LoginPage: FunctionComponent<Props> = ({}: Props) => (
        <LoginForm />
);

export default LoginPage;
