import User from "./user";
import Reaction from "./reaction";
import I18n from "i18n-js";

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
}

export function getCategoryString(post: Post): string | undefined {
    switch (post.category) {
        case 0:
            return I18n.t('ui.post.category.meme');
        case 1:
            return I18n.t('ui.post.category.fail');
        case 2:
            return I18n.t('ui.post.category.gif');
        default:
            return undefined;
    }
}