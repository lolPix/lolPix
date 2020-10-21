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

const App: FunctionComponent = () => {
    const [reload, toggleReload] = useState(false)
    const [loading, setLoading] = useState(true)
    const [authorized, setAuthorized] = useState(false)
    const [account, setAccount] = useState(undefined);
    useEffect(() => {
        Api({path: '/auto_login'}).then(
            res => {
                if (res.status == 200) {
                    res.json().then(
                        json => {
                            console.log(I18n.t('console.authorized') + json);
                            setAccount({account: json});
                            setAuthorized(true);
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
    }, [reload])
    return ((loading && <Loader/>) ||
        <Router>
            <Switch>
                <Route exact path="/">
                    <HomePage account={account} authorized={authorized}/>
                </Route>
                <Route path="/login">
                    <LoginPage account={account} toggleReload={toggleReload}/>
                </Route>
                <Route render={() => <h1>Page not found</h1>}/>
            </Switch>
        </Router>);
};

export default App;
