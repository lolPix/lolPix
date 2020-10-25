import React, {FunctionComponent, useState} from 'react';
import Post from "../model/post";
import User from "../model/user";
import LComment from "../model/LComment";
import {formatDistanceToNow, formatRFC7231, parseISO} from "date-fns";
import I18n from "i18n-js";
import {Link} from 'react-router-dom';
import ReactionsForm from "./form/ReactionsForm";
import CommentReactionsForm from "./form/CommentReactionsForm";

type Props = {
    post: Post,
    account: User,
    refreshPost: () => void,
}

const CommentList: FunctionComponent<Props> = ({post, account, refreshPost}: Props) => {
    const comments = post.comments.map((c: LComment, k) => {
        const commentDateFn = parseISO(c.created_at);
        return (
            <li key={k}>
                <div className="content">
                    <span>{c.content}</span>
                    <span className={'meta'}>
                    <abbr title={formatRFC7231(commentDateFn)} className={'date'}>
                        {formatDistanceToNow(commentDateFn, {addSuffix: true})}
                    </abbr>
                        &nbsp;{I18n.t('ui.comment.by')}&nbsp;
                        <Link to={'/user/' + c.user.username} className={'user'}>{c.user.username}</Link>
                </span>
                </div>
                <CommentReactionsForm refreshPost={refreshPost} account={account} comment={c}/>
            </li>
        );
    });

    return <ul className={'comment-list'}>{comments}</ul>
};

export default CommentList;