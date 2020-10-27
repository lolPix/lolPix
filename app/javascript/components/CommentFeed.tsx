import React, {FunctionComponent, useEffect, useState} from 'react';
import Api from "../base/Api";
import I18n from "i18n-js";
import Loader from "./Loader";
import User from "../model/user";
import CommentWidget from "./CommentWidget";

type Props = {
    account: User,
    onlyForUser?: User,
    sort?: "best" | "new",
    showPostLinks?: boolean
}

function generatePath(onlyForUser: User | undefined,
                      sort: "best" | "new" | undefined) {
    let path = '/comments?';
    if (onlyForUser !== undefined) {
        path += '&username=' + encodeURIComponent(onlyForUser.username);
    }
    if (sort !== undefined) {
        path += '&sort=' + sort;
    }
    return path;
}

const CommentFeed: FunctionComponent<Props> = ({account, onlyForUser, sort, showPostLinks = false}: Props) => {
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);

    function refreshFeed() {
        Api({path: generatePath(onlyForUser, sort)}).then(
            res => {
                if (res.status === 200) {
                    res.json().then(
                        json => {
                            if (json && json[0]) {
                                console.log(I18n.t('console.got_comments') + JSON.stringify(json));
                                const nextPageLinkMatch = res.headers.get('Link').match(/<([^<>]*)>; rel="next"/)
                                if (nextPageLinkMatch && nextPageLinkMatch[1]) {
                                    const nextPageLink = nextPageLinkMatch[1];
                                    console.log(I18n.t('console.found_next_link') + nextPageLink) // TODO: do something with pagination
                                } else {
                                    console.log(I18n.t('console.warning.no_next_link_found'))
                                }
                                setComments(json);
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
    }

    useEffect(() => {
        setLoading(true);
        refreshFeed();
    }, [])

    return (
        (loading && <Loader/>) ||
        (comments.length &&
            <ul className={'post-feed'}>
                {comments.map((c, k) => {
                    return (
                        <li key={k}>
                            <CommentWidget refreshPost={refreshFeed} showPostLink={showPostLinks} account={account} comment={c} />
                        </li>
                    );
                })}
            </ul>) || <h1>{I18n.t('error.no_posts_found')}</h1>
    );
};

export default CommentFeed;
