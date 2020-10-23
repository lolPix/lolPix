import React, {Dispatch, FunctionComponent, SetStateAction, useEffect, useRef, useState} from 'react';
import Post from "../model/post";
import {formatDistanceToNow, formatRFC7231, parseISO} from 'date-fns'
import I18n from "i18n-js";
import {Link} from 'react-router-dom';
import ReactionsForm from "./form/ReactionsForm";
import User from "../model/user";
import Api from "../base/Api";

type Props = {
    post: Post,
    account: User
}

const PostWidget: FunctionComponent<Props> = ({post, account}: Props) => {
    const [refreshPost, toggleRefreshPost] = useState(false);
    const [statePost, setStatePost] = useState(post);
    const initialExecution = useRef(true);
    useEffect(() => {
        if (initialExecution.current) {
            initialExecution.current = false
        } else {
            Api({path: '/posts/' + post.id}).then(
                res => {
                    if (res.status === 200) {
                        res.json().then(
                            json => {
                                if (json && json.id) {
                                    console.log(I18n.t('console.refreshed_post') + JSON.stringify(json));
                                    setStatePost(json);
                                } else {
                                    console.error(I18n.t('console.error') + ' Unknown JSON returned: ' + JSON.stringify(json)) // TODO: error handling
                                }
                            }, err => {
                                console.error(I18n.t('console.error') + JSON.stringify(err)) // TODO: error handling
                            });
                    }
                },
                err => {
                    console.error(I18n.t('console.error') + JSON.stringify(err)) // TODO: error handling
                }
            )
        }
    }, [refreshPost]);
    const postDateFn = parseISO(statePost.created_at);
    return (
        <div className={'post-widget'}>
            <h2 className={'title'}>{statePost.title}</h2>
            <img src={statePost.image} alt={statePost.alt_text}/>
            <div className="bottom">
                <ReactionsForm refreshPost={toggleRefreshPost} account={account} post={statePost}/>
                <p className="meta">
                    <abbr title={formatRFC7231(postDateFn)} className={'date'}>{formatDistanceToNow(postDateFn, { addSuffix: true })}</abbr>
                    {' ' + I18n.t('ui.post.by') + ' '}
                    <Link to={'/user/' + statePost.user.username} className={'user'}>{statePost.user.username}</Link>
                </p>
            </div>
        </div>
    );
};

export default PostWidget;
