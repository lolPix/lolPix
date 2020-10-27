import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import Api from "../base/Api";
import I18n from "i18n-js";
import PostWidget from "./PostWidget";
import Loader from "./Loader";
import User from "../model/user";
import Post from "../model/Post";

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

const PostFeed: FunctionComponent<Props> = ({account, onlyForUser, sort, only}: Props) => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [mostVisiblePost, setMostVisiblePost] = useState<Post | undefined>(undefined);
    const [shouldScroll, setShouldScroll] = useState(false);

    useEffect(() => {
        const handlePostFeedKeyboardNavigation = function (e: KeyboardEvent) {
            if (!mostVisiblePost) return;

            const previousPost = posts[posts.indexOf(mostVisiblePost) - 1];
            const nextPost = posts[posts.indexOf(mostVisiblePost) + 1];

            switch ((e as KeyboardEvent).key) {
                case 'k':
                    if (previousPost) {
                        setMostVisiblePost(previousPost)
                    }
                    setShouldScroll(true);
                    return;
                case 'j':
                    if (nextPost) {
                        setMostVisiblePost(nextPost);
                    }
                    setShouldScroll(true);
                    return;
                default :
                    return;
            }
        }

        document.addEventListener("keydown", handlePostFeedKeyboardNavigation)

        return () => document.removeEventListener("keydown", handlePostFeedKeyboardNavigation);
    }, [mostVisiblePost]);

    useEffect(() => {
        setLoading(true);
        Api({path: generatePath(onlyForUser, sort, only)}).then(
            res => {
                if (res.status === 200) {
                    res.json().then(
                        json => {
                            if (json && json[0]) {
                                console.log(I18n.t('console.got_posts') + JSON.stringify(json));
                                const nextPageLinkMatch = res.headers.get('Link').match(/<([^<>]*)>; rel="next"/)
                                if (nextPageLinkMatch && nextPageLinkMatch[1]) {
                                    const nextPageLink = nextPageLinkMatch[1];
                                    console.log(I18n.t('console.found_next_link') + nextPageLink) // TODO: do something with pagination
                                } else {
                                    console.log(I18n.t('console.warning.no_next_link_found'))
                                }
                                setPosts(json);
                                setMostVisiblePost(json[0]);
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
    }, []);

    return (
        (loading && <Loader/>) ||
        (posts.length &&
            <ul className={'post-feed'}>
                {posts.map((p, k) => {
                    return (
                        <li key={k}>
                            <PostWidget onPostCompletelyVisible={setMostVisiblePost}
                                        active={mostVisiblePost?.id === p.id} showComments={false} showLinks={true}
                                        account={account} post={p}
                                        setShouldScroll={setShouldScroll} shouldScroll={shouldScroll}/>
                        </li>
                    );
                })}
            </ul>) || <h1>{I18n.t('error.no_posts_found')}</h1>
    );
};

export default PostFeed;
