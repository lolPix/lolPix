import React, {FunctionComponent} from "react";
import {formatDistanceToNow, formatRFC7231, parseISO} from "date-fns";
import I18n from "i18n-js";
import CommentReactionsForm from "./form/CommentReactionsForm";
import {Link} from 'react-router-dom';
import User from "../model/user";
import LolPixComment from "../model/LolPixComment";

type Props = {
    comment: LolPixComment,
    account: User,
    refreshPost?: () => void | undefined,
}

const CommentWidget: FunctionComponent<Props> = ({account, comment, refreshPost}: Props) => {
    const commentDateFn = parseISO(comment.created_at);
    return (
        <div className={'comment-widget'}>
            <div className="content">
                <span>{comment.content}</span>
                <span className={'meta'}>
                    <abbr title={formatRFC7231(commentDateFn)} className={'date'}>
                        {formatDistanceToNow(commentDateFn, {addSuffix: true})}
                    </abbr>
                    &nbsp;{I18n.t('ui.comment.by')}&nbsp;
                    <Link to={'/user/' + comment.user.username} className={'user'}>{comment.user.username}</Link>
                </span>
            </div>
            <CommentReactionsForm refreshPost={refreshPost} account={account} comment={comment}/>
        </div>
    );
};

export default CommentWidget;