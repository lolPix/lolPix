import React, {FunctionComponent} from "react";
import {StaticRouter as Router,} from 'react-router-dom';
import LoginPage from "../../pages/LoginPage";
import NavBar from "../nav/NavBar";
import User from "../../model/User";
import Footer from "../Footer";
import {createMemoryHistory} from 'history';

type Props = {
    account: User | undefined,
    url: string,
};

const ServerSideLoginPage: FunctionComponent<Props> = ({account, url}: Props) => {
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
                        <LoginPage account={account}/>
                    </div>
                    <Footer account={account}/>
                </Router>
            </div>
        </>
    );
};

export default ServerSideLoginPage;
