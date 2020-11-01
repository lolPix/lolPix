import User from "../model/User";
import Post from "../model/Post";
import LolPixComment from "../model/LolPixComment";

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

function getTopLevelCommentsFromPost(appElem: HTMLElement): LolPixComment[] {
    if (appElem.dataset.ssrpostTopLevelCommentsId) {
        return [
            {
                id: parseInt(appElem.dataset.ssrpostTopLevelCommentsId, 10),
                post_id: parseInt(appElem.dataset.ssrpostTopLevelCommentsPostId, 10),
                parent_id: parseInt(appElem.dataset.ssrpostTopLevelCommentsParentId, 10),
                created_at: appElem.dataset.ssrpostTopLevelCommentsCreatedAt,
                content: appElem.dataset.ssrpostTopLevelCommentsContent,
                reactions: [], // FIXME: I am too tired right now for this...
                replies: [], // FIXME: I am too tired right now for this...
                user: {
                    id: parseInt(appElem.dataset.ssrpostTopLevelCommentsUserId, 10),
                    bio: appElem.dataset.ssrpostTopLevelCommentsUserBio,
                    username: appElem.dataset.ssrpostTopLevelCommentsUserUsername,
                    image: appElem.dataset.ssrpostTopLevelCommentsUserImage,
                    admin: appElem.dataset.ssrpostTopLevelCommentsUserAdmin === 'true'
                }
            }
        ];
    }
    else return []; // FIXME: I am too tired right now for this...
}

export function extractSSRPost(): Post | undefined {
    const appElem = document.getElementById('app');
    if (appElem.dataset.ssrpostId) {
        return {
            id: parseInt(appElem.dataset.ssrpostId, 10),
            title: appElem.dataset.ssrpostTitle,
            postId: appElem.dataset.ssrpostPostId,
            created_at: appElem.dataset.ssrpostCreatedAt,
            image: appElem.dataset.ssrpostImage,
            alt_text: appElem.dataset.ssrpostAltText,
            category: parseInt(appElem.dataset.ssrpostCategory, 10),
            reactions: JSON.parse(appElem.dataset.ssrpostReactions.replace(/=>/g, ':')),
            top_level_comments: getTopLevelCommentsFromPost(appElem),
            user: {
                bio: appElem.dataset.ssrpostUserBio,
                id: parseInt(appElem.dataset.ssrpostUserId, 10),
                username: appElem.dataset.ssrpostUserUsername,
                image: appElem.dataset.ssrpostUserImage,
                admin: appElem.dataset.ssrpostUserAdmin === 'true'
            }
        };
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
