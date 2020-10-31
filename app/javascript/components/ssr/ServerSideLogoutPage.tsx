import React, {FunctionComponent} from "react";
import {StaticRouter as Router,} from 'react-router-dom';
import NavBar from "../nav/NavBar";
import Footer from "../Footer";
import {createMemoryHistory} from 'history';
import I18n from "i18n-js";

type Props = {
    url: string,
};

const ServerSideRegistrationPage: FunctionComponent<Props> = ({url}: Props) => {
    const pathname = new URL(url).pathname;
    const history = createMemoryHistory({initialEntries: [pathname]});
    return (
        <>
            <div className="wrapper">
                <Router history={history} location={pathname}>
                    <NavBar showLogo={true} account={undefined}/>
                    <div className="content">
                        <p>{I18n.t('ui.redirecting')}</p>
                    </div>
                    <Footer account={undefined}/>
                </Router>
            </div>
        </>
    );
};

export default ServerSideRegistrationPage;
