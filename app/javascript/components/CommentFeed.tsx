import React, {FunctionComponent, useEffect, useState} from 'react';
import Api from "../base/Api";
import I18n from "i18n-js";
import Loader from "./Loader";
import User from "../model/user";
import CommentWidget from "./CommentWidget";
import {extractNextPageLink, randomChars} from "../base/Util";
import Post from "../model/Post";
import LolPixComment from "../model/LolPixComment";

type Props = {
    account: User,
    onlyForUser?: User,
    sort?: "best" | "new",
    showPostLinks?: boolean,
    refreshPost?: () => void,
    onlyForPost?: Post
}

function generatePath(onlyForUser: User | undefined,
                      sort: "best" | "new" | undefined,
                      onlyForPost: Post) {
    let path = '/comments?';
    if (onlyForUser !== undefined) {
        path += '&username=' + encodeURIComponent(onlyForUser.username);
    }
    if (sort !== undefined) {
        path += '&sort=' + sort;
    }
    if (onlyForPost !== undefined) {
        path += '&post_id=' + onlyForPost.id
    }
    return path;
}

function getMoreComments(nextLink: string,
                         setNextLink: (nextLink: string) => void,
                         setLoading: (loading: boolean) => void,
                         callback: (comments: LolPixComment[]) => void) {
    Api({path: nextLink.split('/api/v1/', 2)[1]}).then(
        res => {
            if (res.status === 200) {
                res.json().then(
                    json => {
                        if (json && json[0]) {
                            console.log(I18n.t('console.got_more_comments') + JSON.stringify(json));
                            extractNextPageLink(res, setNextLink);
                            callback(json);
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

function getInitialComments(onlyForPost: Post) {
    if (onlyForPost !== undefined &&
        onlyForPost.top_level_comments !== undefined) {
        return onlyForPost.top_level_comments;
    } else {
        return [];
    }
}

const CommentFeed: FunctionComponent<Props> = ({account, onlyForUser, sort, showPostLinks = false, refreshPost, onlyForPost}: Props) => {
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState(getInitialComments(onlyForPost));
    const [nextLink, setNextLink] = useState(undefined);

    function refreshFeed() {
        Api({path: generatePath(onlyForUser, sort, onlyForPost)}).then(
            res => {
                if (res.status === 200) {
                    res.json().then(
                        json => {
                            if (json && json[0]) {
                                console.log(I18n.t('console.got_comments') + JSON.stringify(json));
                                extractNextPageLink(res, setNextLink);
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
        {
            refreshPost && refreshPost()
        }
    }

    useEffect(() => {
        if(!comments.length) {
            setLoading(true);
            refreshFeed();
        }
    }, [])

    return (
        (loading && <Loader/>) ||
        (comments.length &&
            <ul className={'comment-feed'}>
                {comments.map((c) => {
                    return (
                        <li key={c.id}>
                            <CommentWidget refreshPost={refreshFeed} showPostLink={showPostLinks} account={account}
                                           comment={c}/>
                        </li>
                    );
                })}
                {nextLink && <li className={'load-more'} key={randomChars(3)}>
                    {/* The random key makes react keep the scroll position
                        instead of scrolling to where the button will be
                        after adding more content! */}
                    <button onClick={() => {
                        getMoreComments(nextLink, setNextLink, setLoading, newComments => {
                            setComments([...comments, ...newComments]);
                        });
                    }} className={'load-more-button'}>{I18n.t('ui.feed.load-more')}</button>
                </li>}
            </ul>) || <h1 className={'no-comments'}>{I18n.t('error.no_comments_found')}</h1>
    );
};

export default CommentFeed;
