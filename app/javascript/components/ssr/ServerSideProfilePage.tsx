import React, {FunctionComponent} from "react";
import {StaticRouter as Router,} from 'react-router-dom';
import NavBar from "../nav/NavBar";
import User from "../../model/User";
import PostPage from "../../pages/PostPage";
import Footer from "../Footer";
import {createMemoryHistory} from 'history';
import Post from "../../model/Post";
import ProfilePage from "../../pages/ProfilePage";

type Props = {
    account: User | undefined,
    url: string,
    user: User
};

const ServerSidePostPage: FunctionComponent<Props> = ({account, url, user}: Props) => {
    const pathname = new URL(url).pathname;
    const history = createMemoryHistory({initialEntries: [pathname]});
    return (
        <>
            <div className="wrapper">
                <Router history={history} location={pathname}>
                    <NavBar showLogo={true} account={account}/>
                    <div className="content">
                        <ProfilePage account={account} user={user}/>
                    </div>
                    <Footer account={account}/>
                </Router>
            </div>
        </>
    );
};

export default ServerSidePostPage;
