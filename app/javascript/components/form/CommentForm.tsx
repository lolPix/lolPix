import React, {FunctionComponent} from 'react';
import Post from "../../model/post";
import I18n from "i18n-js";
import {Form, Formik} from "formik";
import Api from "../../base/Api";
import User from "../../model/user";
import LolPixComment from "../../model/LolPixComment";

type Props = {
    post_id: number,
    account: User,
    parent?: LolPixComment | undefined,
    refreshPost: () => void,
}

type FormValues = {
    parent_id: number;
    content: string,
    post_id: number,
    user_id: number,
}

function getParentId(parent: LolPixComment): number {
    if (parent !== undefined) {
        return parent.id;
    }
    return -1;
}

const CommentForm: FunctionComponent<Props> = ({post_id, account, parent, refreshPost}: Props) => {
    const initialValues: FormValues = {
        content: '',
        post_id: post_id,
        user_id: account.id,
        parent_id: getParentId(parent)
    };
    return (<Formik
            initialValues={initialValues}
            validate={() => ({})}

            onSubmit={(values, {setSubmitting, resetForm}) => {
                console.log(I18n.t('console.reacting'));
                setSubmitting(true);
                Api({
                    path: '/comments',
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
                                        resetForm();
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
                  values
              }) => (

                <Form onSubmit={handleSubmit} id={'comment-form'}>
                    <textarea cols={32} rows={5}
                              name={'content'}
                              id={'content'}
                              value={values.content}
                              disabled={isSubmitting}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder={I18n.t('ui.form.comment')}
                    />
                    <button type="submit" disabled={isSubmitting}>
                        {I18n.t('ui.form.submit.post')}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default CommentForm;
