import React, {FunctionComponent, useEffect, useState} from 'react';
import User from "../model/user";
import Api from "../base/Api";
import I18n from "i18n-js";
import Loader from "../components/Loader";
import {useParams} from "react-router-dom";
import Post from "../model/Post";
import {extractSSRPost} from "../base/SSRDataExtractors";
import PostReportForm from "../components/form/PostReportForm";

type Props = {
    account: User,
    post?: Post
}

const PostReportPage: FunctionComponent<Props> = ({account, post}: Props) => {
    const [statePost, setStatePost] = useState(post);
    const {postId} = useParams();

    useEffect(() => {
        const extractedSSRPost = extractSSRPost();
        if (extractedSSRPost) {
            setStatePost(extractedSSRPost);
        } else {
            if (!statePost) {
                Api({path: '/posts/' + encodeURIComponent(postId)}).then(
                    res => {
                        if (res.status === 200) {
                            res.json().then(
                                json => {
                                    if (json && json.id) {
                                        console.log(I18n.t('console.loaded_post') + JSON.stringify(json));
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
                );
            }
        }
    }, []);

    return ((!statePost && <Loader/>) ||
        <div className={'post-report-page'}>
            <PostReportForm account={account} post={statePost}/>
        </div>
    );
};

export default PostReportPage;