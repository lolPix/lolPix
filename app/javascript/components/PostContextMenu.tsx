import React, {FunctionComponent, useState} from 'react';
import Post from "../model/Post";
import User from "../model/User";
import I18n from "i18n-js";
import {useHistory} from "react-router-dom";
import {useToasts} from 'react-toast-notifications'
import Api from "../base/Api";
import {copyToClipboard, getCategoryString} from "../base/Util";

type Props = {
    post: Post,
    account: User,
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

    function sharePost() {
        copyToClipboard(window.location.origin + '/posts/' + post.id); //TODO: maybe not the best idea but enough for <v1...
        addToast(I18n.t('ui.context-menu.post.url_copied_to_clipboard'), {appearance: 'success', autoDismiss: true});
    }

    function reportPost() {
        history.push('/report/' + post.id);
    }

    function downloadPost() {
        const a = document.createElement('a');
        a.href = post.image;
        a.download = "lolpix-" + getCategoryString(post).toLowerCase() + ".png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <div className={'post-context-menu'}>
            <button className={'toggle'} onClick={toggleMenu}>{I18n.t('ui.context-menu.trigger')}</button>
            {showMenu && <div className="menu">
                <button onClick={sharePost}>{I18n.t('ui.context-menu.post.share')}</button>
                <button onClick={downloadPost}>{I18n.t('ui.context-menu.post.save')}</button>
                {(post.user.id !== account.id) &&
                <button onClick={reportPost}>{I18n.t('ui.context-menu.post.report')}</button>}
                {(post.user.id === account.id || account.admin) &&
                <button onClick={deletePost}>{I18n.t('ui.context-menu.post.delete')}</button>}
            </div>}
        </div>
    );
};

export default PostContextMenu;
