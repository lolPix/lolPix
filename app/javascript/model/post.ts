type PostCategory =
    0 | // memes
    1 | // fails
    2   // gifs

export default class Post {
    title: string;
    image: string;
    category: PostCategory;
}
