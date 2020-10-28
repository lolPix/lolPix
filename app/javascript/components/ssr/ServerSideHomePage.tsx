import React, {FunctionComponent} from "react";
import HomePage from "../../pages/HomePage";
import {Route, StaticRouter as Router, Switch,} from 'react-router-dom';
import LoginPage from "../../pages/LoginPage";
import I18n from "i18n-js";
import NavBar from "../nav/NavBar";
import LogoutPage from "../../pages/LogoutPage";
import RegistrationPage from "../../pages/RegistrationPage";
import NewPostPage from "../../pages/NewPostPage";
import User from "../../model/User";
import PostPage from "../../pages/PostPage";
import Footer from "../Footer";
import ProfilePage from "../../pages/ProfilePage";
import {FailsPage, GIFsPage, MemesPage, NewestPage, TopPage} from "../../pages/TopLevelFeeds";
import {createMemoryHistory} from 'history';

type Props = {
    account: User | undefined,
    url: string,
};

const ServerSideHomePage: FunctionComponent<Props> = ({account, url}: Props) => {
    console.log('Server side user: ' + JSON.stringify(account))
    console.log('Server side url: ' + url)
    const pathname = new URL(url).pathname;
    console.log('Server side pathname: ' + pathname)
    const history = createMemoryHistory({initialEntries: [pathname]});
    return (
        <>
            <div className="wrapper">
                <Router history={history} location={pathname}>
                    <NavBar showLogo={true} account={account}/>
                    <div className="content">
                        <HomePage account={account}/>
                    </div>
                    <Footer account={account}/>
                </Router>
            </div>
        </>
    );
};

export default ServerSideHomePage;
