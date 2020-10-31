import User from "../model/User";
import Post from "../model/Post";

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
        return ssrpost;
    }
    return undefined;
}

export function extractSSRProfile(): User | undefined {
    const appElem = document.getElementById('app');
    if (appElem.dataset.ssrprofileId) {
        const ssrprofile: User = {
            bio: appElem.dataset.ssrprofileBio,
            id: parseInt(appElem.dataset.ssrprofileId, 10),
            username: appElem.dataset.ssrprofileUsername,
            image: appElem.dataset.ssrprofileImage,
            admin: appElem.dataset.ssrprofileAdmin === 'true'
        };
        return ssrprofile;
    }
    return undefined;
}

export function extractSSRPosts(): Post[] | undefined {
    const appElem = document.getElementById('app');
    if (appElem.dataset.ssrposts) {
        const decodedText = decodeURIComponent(appElem.dataset.ssrposts);
        const ssrposts: Post[] = JSON.parse(decodedText);
        return ssrposts;
    }
    return undefined;
}
