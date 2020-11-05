import React, {FunctionComponent} from 'react';
import HomePage from "../pages/HomePage";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import LogoutPage from "../pages/LogoutPage";
import {FailsPage, GIFsPage, MemesPage, NewestPage, TopPage} from "../pages/TopLevelFeeds";
import NewPostPage from "../pages/NewPostPage";
import PostPage from "../pages/PostPage";
import ProfilePage from "../pages/ProfilePage";
import PostReportPage from "../pages/PostReportPage";
import I18n from "i18n-js";
import {Route, Switch,} from 'react-router-dom';
import User from "../model/User";

type Props = {
    account: User | undefined;
};

const Routes: FunctionComponent<Props> = ({account}: Props) => (
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
        <Route exact path={'/report/:postId'}>
            <PostReportPage account={account}/>
        </Route>
        <Route render={() => <h1>{I18n.t('error.page_not_found')}</h1>}/>
    </Switch>
);

export default Routes;
