import React, {FunctionComponent} from "react";
import HomePage from "../pages/HomePage";
import {Route, StaticRouter as Router, Switch,} from 'react-router-dom';
import LoginPage from "../pages/LoginPage";
import I18n from "i18n-js";
import NavBar from "../components/nav/NavBar";
import LogoutPage from "../pages/LogoutPage";
import RegistrationPage from "../pages/RegistrationPage";
import NewPostPage from "../pages/NewPostPage";
import User from "../model/user";
import PostPage from "../pages/PostPage";
import Footer from "../components/Footer";
import ProfilePage from "../pages/ProfilePage";
import {FailsPage, GIFsPage, MemesPage, NewestPage, TopPage} from "../pages/TopLevelFeeds";
import {createMemoryHistory} from 'history';

type Props = {
    account: User | undefined,
    url: string,
};

const ServerSideApp: FunctionComponent<Props> = ({account, url}: Props) => {
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
                        <Switch>
                            <Route exact path="/">
                                <HomePage account={account}/>
                            </Route>
                            <Route exact path="/join">
                                <RegistrationPage/>
                            </Route>
                            <Route exact path="/login">
                                <LoginPage account={account}/>
                            </Route>
                            <Route exact path="/logout">
                                <LogoutPage/>
                            </Route>
                            <Route exact path="/top">
                                <TopPage account={account}/>
                            </Route>
                            <Route exact path="/newest">
                                <NewestPage account={account}/>
                            </Route>
                            <Route exact path="/memes">
                                <MemesPage account={account}/>
                            </Route>
                            <Route exact path="/fails">
                                <FailsPage account={account}/>
                            </Route>
                            <Route exact path="/gifs">
                                <GIFsPage account={account}/>
                            </Route>
                            <Route exact path={'/new'}>
                                <NewPostPage account={account}/>
                            </Route>
                            <Route exact path={'/post/:postId'}>
                                <PostPage account={account}/>
                            </Route>
                            <Route exact path={'/user/:username'}>
                                <ProfilePage account={account}/>
                            </Route>
                            <Route render={() => <h1>{I18n.t('error.page_not_found')}</h1>}/>
                        </Switch>
                    </div>
                    <Footer account={account}/>
                </Router>
            </div>
        </>
    );
};

export default ServerSideApp;
