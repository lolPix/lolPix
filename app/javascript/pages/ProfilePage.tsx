import React, {FunctionComponent, useEffect, useState} from 'react';
import {Redirect, useParams} from "react-router-dom";
import User from "../model/user";
import Api from "../base/Api";
import I18n from "i18n-js";
import Loader from "../components/Loader";
import PostFeed from "../components/PostFeed";
import defaultPicture from "../../assets/images/logo_grey.svg";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import CommentFeed from "../components/CommentFeed";
import {extractSSRProfile} from "../base/SSRDataExtractors";

type Props = {
    account: User | undefined;
    user?: User
}

const ProfilePage: FunctionComponent<Props> = ({account, user}: Props) => {
    const {username} = useParams();
    const [stateUser, setStateUser] = useState<User>(user);

    useEffect(() => {
        const extractedProfile = extractSSRProfile();
        if(!stateUser) {
            if(extractedProfile) {
                setStateUser(extractedProfile)
                console.log('Using SSR profile...')
            } else {
                Api({path: '/users/' + encodeURIComponent(username)}).then(
                    res => {
                        if (res.status === 200) {
                            res.json().then(
                                json => {
                                    if (json && json.bio) {
                                        console.log(I18n.t('console.loaded_user') + JSON.stringify(json));
                                        setStateUser(json);
                                    } else {
                                        console.error(I18n.t('console.error') + ' Unknown JSON returned: ' + JSON.stringify(json)) // TODO: error handling
                                    }
                                }, err => {
                                    console.error(I18n.t('console.error') + JSON.stringify(err)) // TODO: error handling
                                });
                        }
                    },
                    err => {
                        console.error(I18n.t('console.error') + JSON.stringify(err)) // TODO: error handling
                    }
                );
            }
        }
    }, []);

    return (
        (!account && <Redirect to={'/login'}/>) ||
        (!stateUser && <Loader/>) ||
        <div className={'profile-page'}>
            <div className="header">
                <div className="profile-picture">
                    {stateUser.image &&
                    <img src={stateUser.image} alt={I18n.t('ui.profile.alt_profile_picture_for') + stateUser.username}/>
                    || <img src={defaultPicture} alt={I18n.t('error.no_image_found')}/>}
                </div>
                <div className="meta">
                    <p className="username">{stateUser.username}</p>
                    <p className="bio">{stateUser.bio}</p>
                </div>
            </div>
            <Tabs className="user-content">
                <TabList>
                    <Tab>{I18n.t('ui.profile.posts.newest')}</Tab>
                    <Tab>{I18n.t('ui.profile.posts.most_reactions')}</Tab>
                    <Tab>{I18n.t('ui.profile.comments.newest')}</Tab>
                    <Tab>{I18n.t('ui.profile.comments.most_reactions')}</Tab>
                </TabList>

                <TabPanel>
                    <PostFeed onlyForUser={stateUser} account={account} sort={'new'}/>
                </TabPanel>
                <TabPanel>
                    <PostFeed onlyForUser={stateUser} account={account} sort={'best'}/>
                </TabPanel>
                <TabPanel>
                    <CommentFeed showPostLinks={true} onlyForUser={stateUser} account={account} sort={'new'}/>
                </TabPanel>
                <TabPanel>
                    <CommentFeed showPostLinks={true} onlyForUser={stateUser} account={account} sort={'best'}/>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default ProfilePage;