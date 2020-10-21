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

const App: FunctionComponent = () => {
    const [loading, setLoading] = useState(true)
    const [account, setAccount] = useState(undefined);
    useEffect(() => {
        Api({path: '/hi'}).then(
            res => {
                if (res.status == 200) {
                    res.json().then(
                        json => {
                            if(json.username && json.bio) {
                                console.log(I18n.t('console.authorized') + JSON.stringify(json));
                                setAccount(json);
                            } else {
                                console.error(I18n.t('console.error') + ' Unknown JSON returned: ' + JSON.stringify(json)) // TODO: error handling
                            }
                        }, err => {
                            console.error(I18n.t('console.error') + JSON.stringify(err)) // TODO: error handling
                        });
                }
                setLoading(false); // this should come last
            },
            err => {
                console.error(I18n.t('console.error') + JSON.stringify(err)) // TODO: error handling
                setLoading(false); // this should come last
            }
        )
    }, [])
    return ((loading && <Loader/>) ||
        <div className="wrapper">
            <Router>
                <NavBar showLogo={true} account={account}/>
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/logout">
                        <LogoutPage />
                    </Route>
                    <Route render={() => <h1>{I18n.t('error.page_not_found')}</h1>}/>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
