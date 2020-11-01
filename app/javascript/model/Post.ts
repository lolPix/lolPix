import User from "./user";
import Reaction from "./reaction";
import LolPixComment from "./LolPixComment";

type PostCategory =
    0 | // memes
    1 | // fails
    2 |  // gifs
    number

export default class Post {
    id: number;
    user: User;
    postId: string;
    created_at: string;
    title: string;
    image: string;
    alt_text: string;
    category: PostCategory;
    reactions: Reaction[];
    top_level_comments: LolPixComment[] | undefined;
}
