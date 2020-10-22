type PostCategory =
    0 | // memes
    1 | // fails
    2   // gifs

export default class Post {
    id: number;
    user_id: number
    postId: string;
    created_at: string;
    title: string;
    image: string;
    category: PostCategory;
}
