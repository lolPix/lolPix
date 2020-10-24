import React, {FunctionComponent, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import User from "../model/user";
import Api from "../base/Api";
import I18n from "i18n-js";
import Loader from "../base/Loader";
import PostFeed from "../components/PostFeed";
import {Redirect} from 'react-router-dom';
import defaultPicture from "../../assets/images/logo_grey.svg";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

type Props = {
    account: User | undefined;
}

const ProfilePage: FunctionComponent<Props> = ({account}: Props) => {
    const {username} = useParams();
    const [user, setUser] = useState<User>(undefined);

    useEffect(() => {
        Api({path: '/users/' + username}).then(
            res => {
                if (res.status === 200) {
                    res.json().then(
                        json => {
                            if (json && json.bio) {
                                console.log(I18n.t('console.loaded_user') + JSON.stringify(json));
                                setUser(json);
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
    }, []);

    return (
        (!account && <Redirect to={'/login'}/>) ||
        (!user && <Loader/>) ||
        <div className={'profile-page'}>
            <div className="header">
                <div className="profile-picture">
                    {user.image &&
                    <img src={user.image} alt={I18n.t('ui.profile.alt_profile_picture_for') + user.username}/>
                    || <img src={defaultPicture} alt={I18n.t('error.no_image_found')}/>}
                </div>
                <div className="meta">
                    <p className="username">{user.username}</p>
                    <p className="bio">{user.bio}</p>
                </div>
            </div>
            <Tabs className="user-content">
                <TabList>
                    <Tab>{I18n.t('ui.profile.posts')}</Tab>
                    <Tab>{I18n.t('ui.profile.comments')}</Tab>
                </TabList>

                <TabPanel>
                    <PostFeed onlyForUser={user} account={user}/>
                </TabPanel>
                <TabPanel>
                    <p className="todo">
                        Comments are not yet implemented.
                    </p>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default ProfilePage;