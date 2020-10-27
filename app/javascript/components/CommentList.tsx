import React, {FunctionComponent} from 'react';
import Post from "../model/post";
import User from "../model/user";
import LolPixComment from "../model/LolPixComment";
import CommentWidget from "./CommentWidget";

type Props = {
    post: Post,
    account: User,
    refreshPost: () => void,
}

const CommentList: FunctionComponent<Props> = ({post, account, refreshPost}: Props) => {
    const comments = post.comments.map((c: LolPixComment) => {
        return (
            <li key={c.id}>
                <CommentWidget comment={c} account={account} refreshPost={refreshPost} />
            </li>
        );
    });

    return <ul className={'comment-list'}>{comments}</ul>
};

export default CommentList;