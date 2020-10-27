import React, {FunctionComponent, useEffect, useState} from 'react';
import Api from "../base/Api";
import I18n from "i18n-js";
import PostWidget from "./PostWidget";
import Loader from "./Loader";
import User from "../model/user";
import Post from "../model/Post";
import {extractNextPageLink, randomChars} from "../base/Util";

type Props = {
    account: User,
    onlyForUser?: User,
    sort?: "best" | "new",
    only?: "memes" | "fails" | "gifs"
}

function generatePath(onlyForUser: User | undefined,
                      sort: "best" | "new" | undefined,
                      only: "memes" | "fails" | "gifs" | undefined) {
    let path = '/posts?';
    if (onlyForUser !== undefined) {
        path += '&username=' + encodeURIComponent(onlyForUser.username);
    }
    if (sort !== undefined) {
        path += '&sort=' + sort;
    }
    if (only !== undefined) {
        path += '&only=' + only;
    }
    return path;
}

function getMorePosts(nextLink: string,
                      setNextLink: (nextLink: string) => void,
                      setLoading: (loading: boolean) => void,
                      callback: (posts: Post[]) => void) {
    Api({path: nextLink.split('/api/v1/', 2)[1]}).then(
        res => {
            if (res.status === 200) {
                res.json().then(
                    json => {
                        if (json && json[0]) {
                            console.log(I18n.t('console.got_more_posts') + JSON.stringify(json));
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

const PostFeed: FunctionComponent<Props> = ({account, onlyForUser, sort, only}: Props) => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [nextLink, setNextLink] = useState(undefined);

    useEffect(() => {
        setLoading(true);
        Api({path: generatePath(onlyForUser, sort, only)}).then(
            res => {
                if (res.status === 200) {
                    res.json().then(
                        json => {
                            if (json && json[0]) {
                                console.log(I18n.t('console.got_posts') + JSON.stringify(json));
                                extractNextPageLink(res, setNextLink);
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
                {posts.map((p) => {
                    return (
                        <li key={p.id}>
                            <PostWidget showComments={false} showLinks={true} account={account} post={p}/>
                        </li>
                    );
                })}
                {nextLink && <li className={'load-more'} key={randomChars(3)}>
                    {/* The random key makes react keep the scroll position
                        instead of scrolling to where the button will be
                        after adding more content! */}
                    <button onClick={() => {
                        getMorePosts(nextLink, setNextLink, setLoading, newPosts => {
                            setPosts([...posts, ...newPosts]);
                        })
                    }} className={'load-more-button'}>{I18n.t('ui.feed.load-more')}</button>
                </li>}
            </ul>) || <h1 className={'no-posts'}>{I18n.t('error.no_posts_found')}</h1>
    );
};

export default PostFeed;
