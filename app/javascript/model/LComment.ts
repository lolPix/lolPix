import User from "./user";
import Reaction from "./reaction";

export default class LComment {
    id: number;
    user: User;
    post_id: string;
    created_at: string;
    content: string;
    reactions: Reaction[];
    replies: number[];
}
