import React, {FunctionComponent} from 'react';
import User from "../model/user";
import NavBar from "../components/nav/NavBar";
import PostFeed from "../components/PostFeed";
import {Redirect} from 'react-router-dom';

type Props = {
    account: User | undefined,
    authorized: boolean
}

const HomePage: FunctionComponent<Props> = ({account, authorized}: Props) => (
    !authorized && <Redirect to={'/login'}/> ||
    <div className={'wrapper'}>
        <NavBar showLogo={true} account={account}/>
        <PostFeed/>
    </div>
);

export default HomePage;
