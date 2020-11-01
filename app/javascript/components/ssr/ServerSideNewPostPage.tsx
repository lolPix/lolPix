import React, {FunctionComponent} from "react";
import {StaticRouter as Router,} from 'react-router-dom';
import NavBar from "../nav/NavBar";
import User from "../../model/User";
import Footer from "../Footer";
import {createMemoryHistory} from 'history';
import NewPostPage from "../../pages/NewPostPage";

type Props = {
    account: User | undefined,
    url: string,
};

const ServerSidePostPage: FunctionComponent<Props> = ({account, url}: Props) => {
    const pathname = new URL(url).pathname;
    const history = createMemoryHistory({initialEntries: [pathname]});
    return (
        <>
            <div className="wrapper">
                <Router history={history} location={pathname}>
                    <NavBar showLogo={true} account={account}/>
                    <div className="content">
                        <NewPostPage account={account}/>
                    </div>
                    <Footer account={account}/>
                </Router>
            </div>
        </>
    );
};

export default ServerSidePostPage;
