import React, {FunctionComponent} from "react";
import {StaticRouter,} from 'react-router-dom';
import NavBar from "../nav/NavBar";
import User from "../../model/User";
import Footer from "../Footer";
import {ToastProvider} from 'react-toast-notifications'
import {createMemoryHistory} from "history";
import Routes from "../../base/Routes";


type Props = {
    account: User | undefined,
    url: string,
};

const ServersideApp: FunctionComponent<Props> = ({account, url}: Props) => {
    const pathname = new URL(url).pathname;
    const history = createMemoryHistory({initialEntries: [pathname]});
    return (
        <ToastProvider>
            <div className="wrapper">
                <StaticRouter history={history} location={pathname}>
                    <NavBar showLogo={true} account={account}/>
                    <div className="content">
                        <Routes account={account}/>
                    </div>
                    <Footer account={account}/>
                </StaticRouter>
            </div>
        </ToastProvider>
    );
};

export default ServersideApp;
