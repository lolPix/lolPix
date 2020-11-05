import React, {FunctionComponent, useState} from 'react';
import Post from "../model/Post";
import User from "../model/User";
import I18n from "i18n-js";
import {useHistory} from "react-router-dom";
import {useToasts} from 'react-toast-notifications'
import Api from "../base/Api";


type Props = {
    post: Post,
    account: User,
}

function reportPost(history, post: Post) {
    return () => history.push('/report/' + post.id);
}

function downloadPost(history, post: Post) {
    return () => console.log('TODO: implement downloads');
}

function sharePost(history, post: Post) {
    return () => console.log('TODO: implement sharing');
}

const PostContextMenu: FunctionComponent<Props> = ({account, post}: Props) => {
    const history = useHistory();
    const {addToast, removeToast} = useToasts();
    const [showMenu, setShowMenu] = useState(false);

    const [deletionToastId, setDeletionToastId] = useState(undefined);

    const listener = () => {
        closeMenu();
    };

    function closeMenu() {
        setShowMenu(false);
        setTimeout(() => {
            document.removeEventListener('click', listener);
        }, 200);
    }

    function openMenu() {
        setShowMenu(true);
        setTimeout(() => {
            document.addEventListener('click', listener);
        }, 200);
    }

    function toggleMenu() {
        if (!showMenu) {
            openMenu();
        } else {
            closeMenu()
        }
    }

    function deletePost() {
        addToast(<div className="toast-content">{I18n.t('ui.context-menu.post.deletion_are_you_sure')}
            <button onClick={() => {
                Api({
                    path: '/posts/' + post.id,
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(
                    res => {
                        if (res.status === 204) {
                            removeToast(deletionToastId, () => setDeletionToastId(undefined));
                            location.reload();
                        }
                    },
                    err => {
                        console.error(I18n.t('console.error') + JSON.stringify(err)) // TODO: error handling
                    }
                );
            }} className={'toast-action warning'}>
                {I18n.t('ui.context-menu.post.delete')}
            </button>
        </div>, {appearance: 'warning'}, (id) => setDeletionToastId(id));
    }

    return (
        <div className={'post-context-menu'}>
            <button className={'toggle'} onClick={toggleMenu}>{I18n.t('ui.context-menu.trigger')}</button>
            {showMenu && <div className="menu">
                <button onClick={sharePost(history, post)}>{I18n.t('ui.context-menu.post.share')}</button>
                <button onClick={downloadPost(history, post)}>{I18n.t('ui.context-menu.post.save')}</button>
                {(post.user.id !== account.id) &&
                <button onClick={reportPost(history, post)}>{I18n.t('ui.context-menu.post.report')}</button>}
                {(post.user.id === account.id || account.admin) &&
                <button onClick={deletePost}>{I18n.t('ui.context-menu.post.delete')}</button>}
            </div>}
        </div>
    );
};

export default PostContextMenu;
