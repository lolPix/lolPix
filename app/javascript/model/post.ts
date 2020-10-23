import User from "./user";
import Reaction from "./reaction";

type PostCategory =
    0 | // memes
    1 | // fails
    2   // gifs

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
}
