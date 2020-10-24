import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import User from "../model/user";
import PostWidget from "../components/PostWidget";
import Api from "../base/Api";
import I18n from "i18n-js";
import Loader from "../base/Loader";
import {useParams} from "react-router-dom";

type Props = {
    account: User,
}

const PostPage: FunctionComponent<Props> = (props: Props) => {
    const [post, setPost] = useState(undefined);
    const {postId} = useParams();

    useEffect(() => {
        Api({path: '/posts/' + postId}).then(
            res => {
                if (res.status === 200) {
                    res.json().then(
                        json => {
                            if (json && json.id) {
                                console.log(I18n.t('console.loaded_post') + JSON.stringify(json));
                                setPost(json);
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
        );
    }, []);

    return ((!post && <Loader/>) ||
        <div className={'post-page'}>
            <PostWidget account={props.account} post={post}/>
        </div>
    );
};

export default PostPage;