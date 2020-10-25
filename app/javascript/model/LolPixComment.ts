import User from "./user";
import CommentReaction from "./CommentReaction";

export default class LolPixComment {
    id: number;
    user: User;
    post_id: string;
    created_at: string;
    content: string;
    reactions: CommentReaction[];
    replies: number[];
}
