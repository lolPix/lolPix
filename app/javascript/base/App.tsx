import React, {FunctionComponent, useEffect, useState} from "react";
import Loader from "./Loader";
import HomePage from "../pages/HomePage";
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
} from 'react-router-dom';
import LoginPage from "../pages/LoginPage";
import Api from "./Api";
import I18n from "i18n-js";
import NavBar from "../components/nav/NavBar";
import LogoutPage from "../pages/LogoutPage";
import RegistrationPage from "../pages/RegistrationPage";
import NewPostPage from "../pages/NewPostPage";
import User from "../model/user";

type Props = {
    account: User | undefined;
}

const App: FunctionComponent<Props> = ({account}: Props) => {
    return (
        <>
            <div className="wrapper">
                <Router>
                    <NavBar showLogo={true} account={account}/>
                    <div className="content">
                        <Switch>
                            <Route exact path="/">
                                <HomePage account={account} />
                            </Route>
                            <Route exact path="/join">
                                <RegistrationPage/>
                            </Route>
                            <Route exact path="/login">
                                <LoginPage/>
                            </Route>
                            <Route exact path="/logout">
                                <LogoutPage/>
                            </Route>
                            <Route exact path={'/new'}>
                                <NewPostPage account={account}/>
                            </Route>
                            <Route render={() => <h1>{I18n.t('error.page_not_found')}</h1>}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        </>
    );
};

export default App;
