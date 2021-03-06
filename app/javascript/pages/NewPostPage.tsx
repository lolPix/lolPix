import React, {FunctionComponent} from 'react';
import User from "../model/user";
import NewPostForm from "../components/form/NewPostForm";
import I18n from "i18n-js";

type Props = {
    account: User | undefined,
}

const NewPostPage: FunctionComponent<Props> = ({account}: Props) => (
    (account && <NewPostForm account={account}/>) ||
    <h1 className={'page-heading'}>{I18n.t('error.logged_in_to_post')}</h1>
);

export default NewPostPage;