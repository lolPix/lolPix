import React from 'react';
import User from "../model/user";
import LoginForm from "../components/form/LoginForm";
import {Redirect} from 'react-router-dom';

type Props = {
    account: User | undefined,
}

const LoginPage = ({account}: Props) => {
    return (account ? <Redirect to={'/'}/> : <LoginForm/>)
};

export default LoginPage;
