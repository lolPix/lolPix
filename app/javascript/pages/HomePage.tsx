import React, {FunctionComponent} from 'react';
import PostFeed from "../components/PostFeed";
import User from "../model/user";
import {Redirect} from 'react-router-dom';

type Props = {
    account: User | undefined,
}
const HomePage: FunctionComponent<Props> = ({account}: Props) => (
    (account && <PostFeed account={account}/>) || <Redirect to={'/login'}/>
);

export default HomePage;
