import React, {FunctionComponent} from "react";
import {StaticRouter as Router,} from 'react-router-dom';

import {createMemoryHistory} from 'history';
import User from "../../../model/User";
import NavBar from "../../nav/NavBar";
import Footer from "../../Footer";
import I18n from "i18n-js";
import PostFeed from "../../PostFeed";
import Post from "../../../model/Post";

type Props = {
    account: User | undefined,
    url: string,
    posts: Post[]
};

const ServerSideNewPage: FunctionComponent<Props> = ({account, url, posts}: Props) => {
    const pathname = new URL(url).pathname;
    const history = createMemoryHistory({initialEntries: [pathname]});
    return (
        <>
            <div className="wrapper">
                <Router history={history} location={pathname}>
                    <NavBar showLogo={true} account={account}/>
                    <div className="content">
                        <h1 className={'page-heading'}>{I18n.t('ui.heading.top_posts')}</h1>
                        <PostFeed account={account} sort={'new'} posts={posts} />
                    </div>
                    <Footer account={account}/>
                </Router>
            </div>
        </>
    );
};

export default ServerSideNewPage;
