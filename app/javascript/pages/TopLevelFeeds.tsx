import React, {FunctionComponent} from 'react';
import User from "../model/user";
import PostFeed from "../components/PostFeed";
import {Redirect} from 'react-router-dom';
import I18n from "i18n-js";

type Props = {
    account: User | undefined;
}

function assureAuthenticated(account: User | undefined, content: JSX.Element) {
    return (account && content) || <Redirect to={'/login'}/>
}

export const TopPage: FunctionComponent<Props> = ({account}: Props) => {
    return assureAuthenticated(account, (
        <>
            <h1 className={'page-heading'}>{I18n.t('ui.heading.top_posts')}</h1>
            <PostFeed account={account} sort={'best'}/>
        </>
    ));
};

export const NewestPage: FunctionComponent<Props> = ({account}: Props) => {
    return assureAuthenticated(account, (
        <>
            <h1 className={'page-heading'}>{I18n.t('ui.heading.newest_posts')}</h1>
            <PostFeed account={account} sort={'new'}/>
        </>
    ));
};

export const MemesPage: FunctionComponent<Props> = ({account}: Props) => {
    return assureAuthenticated(account, (
        <>
            <h1 className={'page-heading'}>{I18n.t('ui.heading.newest_memes')}</h1>
            <PostFeed account={account} only={'memes'}/>
        </>
    ));
};

export const FailsPage: FunctionComponent<Props> = ({account}: Props) => {
    return assureAuthenticated(account, (
        <>
            <h1 className={'page-heading'}>{I18n.t('ui.heading.newest_fails')}</h1>
            <PostFeed account={account} only={'fails'}/>
        </>
    ));
};
export const GIFsPage: FunctionComponent<Props> = ({account}: Props) => {
    return assureAuthenticated(account, (
        <>
            <h1 className={'page-heading'}>{I18n.t('ui.heading.newest_gifs')}</h1>
            <PostFeed account={account} only={'gifs'}/>
        </>
    ));
};
