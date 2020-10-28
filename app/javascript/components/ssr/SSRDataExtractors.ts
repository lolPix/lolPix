import User from "../../model/User";
import Post from "../../model/Post";

export function extractSSRUser(): User | undefined {
    const appElem = document.getElementById('app');
    if (appElem.dataset.ssruserId) {
        const ssruser: User = {
            bio: appElem.dataset.ssruserBio,
            id: parseInt(appElem.dataset.ssruserId, 10),
            username: appElem.dataset.ssruserUsername,
            image: appElem.dataset.ssruserImage,
            admin: appElem.dataset.ssruserAdmin === 'true'
        };
        console.log('Serverside user in client: ' + JSON.stringify(ssruser))
        return ssruser;
    }
    return undefined;
}

export function extractSSRPost(): Post | undefined {
    const appElem = document.getElementById('app');
    if (appElem.dataset.ssrpostId) {
        const ssrpost: Post = {
            id: parseInt(appElem.dataset.ssrpostId, 10),
            title: appElem.dataset.ssrpostTitle,
            postId: appElem.dataset.ssrpostPostId,
            created_at: appElem.dataset.ssrpostCreatedAt,
            image: appElem.dataset.ssrpostImage,
            alt_text: appElem.dataset.ssrpostAltText,
            category: parseInt(appElem.dataset.ssrpostCategory, 10),
            reactions: JSON.parse(appElem.dataset.ssrpostReactions),
            user: {
                bio: appElem.dataset.ssrpostUserBio,
                id: parseInt(appElem.dataset.ssrpostUserId, 10),
                username: appElem.dataset.ssrpostUserUsername,
                image: appElem.dataset.ssrpostUserImage,
                admin: appElem.dataset.ssrpostUserAdmin === 'true'
            }
        };
        console.log('Serverside post in client: ' + JSON.stringify(ssrpost))
        return ssrpost;
    }
    return undefined;
}
