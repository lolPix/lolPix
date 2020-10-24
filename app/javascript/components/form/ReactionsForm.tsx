import React, {FunctionComponent} from 'react';
import Post from "../../model/post";
import I18n from "i18n-js";
import {Form, Formik} from "formik";
import Api from "../../base/Api";
import User from "../../model/user";

type Props = {
    post: Post,
    account: User,
    refreshPost: () => void,
}

type FormValues = {
    positive: boolean,
    post_id: number,
    user_id: number,
}

function calculateScore(post: Post) {
    return post.reactions.filter(r => r.positive).length
        - post.reactions.filter(r => !r.positive).length;
}

function alreadyReacted(post: Post, account: User) {
    return post.reactions.filter(r => {
        return r.user_id === account.id && r.post_id === post.id;
    }).length > 0;
}

const ReactionsForm: FunctionComponent<Props> = ({post, account, refreshPost}: Props) => {
    const initialValues: FormValues = {positive: false, post_id: post.id, user_id: account.id};
    return (<Formik
            initialValues={initialValues}
            validate={() => ({})}

            onSubmit={(values, {setSubmitting}) => {
                console.log(I18n.t('console.reacting'));
                setSubmitting(true);
                Api({
                    path: '/reactions',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                }).then(
                    res => {
                        if (res.status === 201) {
                            res.json().then(
                                json => {
                                    if (!json.error && json.id) {
                                        refreshPost();
                                    } else {
                                        console.error('Error: ' + json.error); // TODO: error handling
                                    }
                                }, err => {
                                    console.error("Error: " + JSON.stringify(err)); // TODO: error handling
                                });
                        }
                        setSubmitting(false); // this should come last
                    },
                    err => {
                        console.error(I18n.t('console.error') + JSON.stringify(err)) // TODO: error handling
                        setSubmitting(false); // this should come last
                    }
                )
            }}
        >

            {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                  submitForm
                  /* and other goodies */
              }) => (

                <Form onSubmit={handleSubmit} id={'reactions-form'}>
                    <button className={'reaction-button'} role={'button'}
                            onClick={() => {
                                setFieldValue("positive", true);
                                return submitForm();
                            }}
                            disabled={isSubmitting || alreadyReacted(post, account)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                    >{I18n.t('ui.post.reaction.positive')}</button>
                    <p className="score">
                        &nbsp;{calculateScore(post)}&nbsp;
                    </p>
                    <button className={'reaction-button'} role={'button'}
                            onClick={() => {
                                setFieldValue("positive", false);
                                return submitForm();
                            }}
                            disabled={isSubmitting || alreadyReacted(post, account)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                    >{I18n.t('ui.post.reaction.negative')}</button>
                </Form>
            )}
        </Formik>
    );
};

export default ReactionsForm;
