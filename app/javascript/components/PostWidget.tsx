import React, {FunctionComponent} from 'react';
import Post from "../model/post";

type Props = {
    post: Post;
}

const PostWidget: FunctionComponent<Props> = ({post}: Props) => (
    <div className={'post-widget'}>
        {JSON.stringify(post)}
    </div>
);

export default PostWidget;