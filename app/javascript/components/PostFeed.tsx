import React, {FunctionComponent, useEffect, useState} from 'react';
import Api from "../base/Api";
import I18n from "i18n-js";
import PostWidget from "./PostWidget";
import Loader from "../base/Loader";
import User from "../model/user";

type Props = {
    account: User,
    onlyForUser?: User
}

const PostFeed: FunctionComponent<Props> = ({account, onlyForUser}: Props) => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setLoading(true);
        Api({path: (!onlyForUser ? '/posts' : '/posts?username=' + onlyForUser.username)}).then(
            res => {
                if (res.status === 200) {
                    res.json().then(
                        json => {
                            if (json && json[0]) {
                                console.log(I18n.t('console.got_posts') + JSON.stringify(json));
                                const nextPageLinkMatch = res.headers.get('Link').match(/<([^<>]*)>; rel="next"/)
                                if (nextPageLinkMatch && nextPageLinkMatch[1]) {
                                    const nextPageLink = nextPageLinkMatch[1];
                                    console.log(I18n.t('console.found_next_link') + nextPageLink)
                                } else {
                                    console.log(I18n.t('console.warning.no_next_link_found'))
                                }
                                setPosts(json);
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
        );
    }, [])

    return (
        (loading && <Loader/>) ||
        (posts.length &&
            <ul className={'post-feed'}>
                {posts.map((p, k) => {
                    return (
                        <li key={k}>
                            <PostWidget showLinks={true} account={account} post={p}/>
                        </li>
                    );
                })}
            </ul>) || <h1>{I18n.t('error.no_posts_found')}</h1>
    );
};

export default PostFeed;