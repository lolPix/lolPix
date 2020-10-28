import React, {FunctionComponent, useState} from 'react';
import Post from "../model/post";
import {formatDistanceToNow, formatRFC7231, parseISO} from 'date-fns'
import I18n from "i18n-js";
import {Link} from 'react-router-dom';
import ReactionsForm from "./form/ReactionsForm";
import User from "../model/user";
import Api from "../base/Api";
import CommentForm from "./form/CommentForm";
import PostContextMenu from "./PostContextMenu";
import CommentFeed from "./CommentFeed";

type Props = {
    post: Post,
    account: User,
    showLinks?: boolean,
    showComments?: boolean
}

function getCategoryString(post: Post): string | undefined {
    switch (post.category) {
        case 0:
            return I18n.t('ui.post.category.meme');
        case 1:
            return I18n.t('ui.post.category.fail');
        case 2:
            return I18n.t('ui.post.category.gif');
        default:
            return undefined;
    }
}

const PostWidget: FunctionComponent<Props> = ({post, account, showLinks = false, showComments = true}: Props) => {
    const [statePost, setStatePost] = useState(post);

    const refreshPost = () => {
        console.log('Refreshing post...')
        Api({path: '/posts/' + encodeURIComponent(statePost.id)}).then(
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
    };

    const postDateFn = parseISO(statePost.created_at);
    const postImage = <img src={statePost.image} alt={statePost.alt_text}/>;
    return (
        <div className={'post-widget'}>
            <h2 className={'title'}>{statePost.title}<PostContextMenu account={account} post={post} /></h2>
            <div className="content">
                {showLinks && <Link to={'/post/' + statePost.id}>{postImage}</Link> || postImage}
                <div className="meta">
                    <p>
                        <span>{getCategoryString(post) + I18n.t('ui.post.date-prefix')}</span>
                        <abbr title={formatRFC7231(postDateFn)} className={'date'}>
                            {formatDistanceToNow(postDateFn, {addSuffix: true})}
                        </abbr>
                        &nbsp;{I18n.t('ui.post.by')}&nbsp;
                        <Link to={'/user/' + statePost.user.username} className={'user'}>
                            {statePost.user.username}
                        </Link>
                    </p>
                    <ReactionsForm refreshPost={refreshPost} account={account} post={statePost}/>
                </div>
                {showComments && <CommentForm account={account} post_id={statePost.id} refreshPost={refreshPost} />}
                {(showComments) && <CommentFeed account={account} sort={'best'} onlyForPost={statePost} refreshPost={refreshPost} />}
            </div>
        </div>
    );
};

export default PostWidget;
