import React, {FunctionComponent, useState} from 'react';
import Post from "../model/Post";
import User from "../model/User";
import I18n from "i18n-js";
import {useHistory} from "react-router-dom";

type Props = {
    post: Post,
    account: User,
}

function reportPost(history, post: Post) {
    return () => history.push('/report/' + post.id);
}

function deletePost(history, post: Post) {
    return () => console.log('TODO: implement deletion');
}

function downloadPost(history, post: Post) {
    return () => console.log('TODO: implement downloads');
}

function sharePost(history, post: Post) {
    return () => console.log('TODO: implement sharing');
}

const PostContextMenu: FunctionComponent<Props> = ({account, post}: Props) => {
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const listener = () => {
        closeMenu();
    };

    function closeMenu() {
        setShowMenu(false);
        console.log('Show: false')
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
        console.log('toggle called...')
        if (!showMenu) {
            console.log('opening menu...')
            openMenu();
        } else {
            console.log('closing menu...')
            closeMenu()
        }
    }

    return (
        <div className={'post-context-menu'}>
            <button className={'toggle'} onClick={toggleMenu}>{I18n.t('ui.context-menu.trigger')}</button>
            {showMenu && <div className="menu">
                <button onClick={sharePost(history, post)}>{I18n.t('ui.context-menu.post.share')}</button>
                <button onClick={downloadPost(history, post)}>{I18n.t('ui.context-menu.post.save')}</button>
                {(post.user.id !== account.id) &&
                <button onClick={reportPost(history, post)}>{I18n.t('ui.context-menu.post.report')}</button>}
                {(post.user.id === account.id) &&
                <button onClick={deletePost(history, post)}>{I18n.t('ui.context-menu.post.delete')}</button>}
            </div>}
        </div>
    );
};

export default PostContextMenu;