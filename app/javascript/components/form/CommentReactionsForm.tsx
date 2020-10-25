import React, {FunctionComponent} from 'react';
import I18n from "i18n-js";
import {Form, Formik} from "formik";
import Api from "../../base/Api";
import User from "../../model/user";
import LolPixComment from "../../model/LolPixComment";

type Props = {
    comment: LolPixComment,
    account: User,
    refreshPost?: () => void | undefined,
}

type FormValues = {
    positive: boolean,
    comment_id: number,
    user_id: number,
}

function calculateScore(comment: LolPixComment) {
    return comment.reactions.filter(r => r.positive).length
        - comment.reactions.filter(r => !r.positive).length;
}

function alreadyReacted(comment: LolPixComment, account: User) {
    return comment.reactions.filter(r => {
        return r.user_id === account.id && r.comment_id === comment.id;
    }).length > 0;
}

const CommentReactionsForm: FunctionComponent<Props> = ({comment, account, refreshPost}: Props) => {
    const initialValues: FormValues = {positive: false, comment_id: comment.id, user_id: account.id};
    return (<Formik
            initialValues={initialValues}
            validate={() => ({})}

            onSubmit={(values, {setSubmitting}) => {
                console.log(I18n.t('console.reacting'));
                setSubmitting(true);
                Api({
                    path: '/comment_reactions',
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
                                        {refreshPost && refreshPost()}
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

                <Form onSubmit={handleSubmit} id={'comment_reactions-form'}>
                    <button className={'reaction-button'} role={'button'}
                            onClick={() => {
                                setFieldValue("positive", true);
                                return submitForm();
                            }}
                            disabled={isSubmitting || alreadyReacted(comment, account)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                    >{I18n.t('ui.comment.reaction.positive')}</button>
                    <p className="score">
                        &nbsp;{calculateScore(comment)}&nbsp;
                    </p>
                    <button className={'reaction-button'} role={'button'}
                            onClick={() => {
                                setFieldValue("positive", false);
                                return submitForm();
                            }}
                            disabled={isSubmitting || alreadyReacted(comment, account)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                    >{I18n.t('ui.comment.reaction.negative')}</button>
                </Form>
            )}
        </Formik>
    );
};

export default CommentReactionsForm;
