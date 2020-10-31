import React, {FunctionComponent, useState} from 'react';
import Post from "../../model/Post";
import I18n from "i18n-js";
import {Redirect} from 'react-router-dom';
import User from "../../model/User";
import Api from "../../base/Api";
import PostContextMenu from "../PostContextMenu";
import {Form, Formik} from "formik";
import {getCategoryString} from "../../base/Util";

type Props = {
    post: Post,
    account: User,
}

type FormValues = {
    description: string,
    post_id: number,
    user_id: number,
}

const PostReportForm: FunctionComponent<Props> = ({post, account}: Props) => {
    const [reportDone, setReportDone] = useState(false);
    const initialValues: FormValues = {
        description: '',
        post_id: post.id,
        user_id: account.id
    };

    const titleString = I18n.t('ui.report.heading') +
        getCategoryString(post) +
        ' "' + post.title + '"';

    return (reportDone && <Redirect to={'/'}/> ||
        <div className={'post-report-widget'}>
            <h2 className={'title'}>{titleString}</h2>

            <Formik
                initialValues={initialValues}
                validate={() => ({})}

                onSubmit={(values, {setSubmitting, resetForm}) => {
                    console.log(I18n.t('console.sending_report'));
                    setSubmitting(true);
                    Api({
                        path: '/reports',
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
                                            setReportDone(true);
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

                    <Form onSubmit={handleSubmit} id={'post-report-form'}>
                        <label htmlFor={'description'}>{I18n.t('ui.report.description')}</label>
                        <textarea cols={32} rows={5}
                                  name={'description'}
                                  id={'description'}
                                  value={values.description}
                                  disabled={isSubmitting}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder={I18n.t('ui.form.comment')}
                        />
                        <button type="submit" disabled={isSubmitting}>
                            {I18n.t('ui.form.submit.report')}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PostReportForm;
