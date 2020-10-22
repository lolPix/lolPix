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

const App: FunctionComponent = () => {
    const [loading, setLoading] = useState(true)
    const [account, setAccount] = useState(undefined);
    useEffect(() => {
        Api({path: '/hi'}).then(
            res => {
                if (res.status == 200) {
                    res.json().then(
                        json => {
                            if (json.username && json.bio) {
                                console.log(I18n.t('console.authorized') + JSON.stringify(json));
                                setAccount(json);
                            } else {
                                console.error(I18n.t('console.error') + ' Unknown JSON returned: ' + JSON.stringify(json)) // TODO: error handling
                            }
                        }, err => {
                            console.error(I18n.t('console.error') + JSON.stringify(err)) // TODO: error handling
                        });
                }
            },
            err => {
                console.error(I18n.t('console.error') + JSON.stringify(err)) // TODO: error handling
            }
        ).then(
            () => {
                setLoading(false); // this should come last
            }
        )
    }, [])
    return (
        <>
            {loading && <Loader/>}
            <div className="wrapper">
                <Router>
                    <NavBar showLogo={true} account={account}/>
                    <div className="content">
                        <Switch>
                            <Route exact path="/">
                                <HomePage />
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
