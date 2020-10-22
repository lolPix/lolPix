import React, {FunctionComponent, useState} from 'react';
import {Field, Form, Formik} from 'formik';
import I18n from "i18n-js";
import Api from "../../base/Api";
import User from "../../model/user";

type FormValues = {
    title: string,
    image: string | Blob,
    category: number
}

type FormErrors = {
    title?: string,
    image?: string,
    category?: string
}

type Props = {
    account: User,
}

function buildFormData(values: FormValues, account: User): FormData {
    const data = new FormData();
    data.append('image', values.image)
    data.append('title', values.title)
    data.append('category', values.category.toString(10))
    data.append('username', account.username)
    return data;
}

const NewPostForm: FunctionComponent<Props> = ({account}: Props) => {
    const [uploadError, setUploadError] = useState(undefined);
    return (<div id={'new-post-form'}>
            <h1>{I18n.t('ui.heading.new_post')}</h1>

            <Formik
                initialValues={{title: '', image: undefined, category: undefined}}
                validate={values => {
                    const errors: FormErrors = {};
                    if (!values.image) {
                        errors.image = I18n.t('error.image_required');
                    } else if (values.image.size > 8388608) {
                        errors.image = I18n.t('error.image_too_large');
                    }
                    if (!values.title) {
                        errors.title = I18n.t('error.title_required');
                    } else if (values.title.length < 8) {
                        errors.title = I18n.t('error.title_too_short');
                    }
                    return errors;
                }}

                onSubmit={(values, {setSubmitting}) => {
                    console.log(I18n.t('console.posting'));
                    setSubmitting(true);
                    const data = buildFormData(values, account);
                    Api({
                        path: '/posts',
                        method: 'POST',
                        body: data
                    }).then(
                        res => {
                            if (res.status == 200) {
                                res.json().then(
                                    json => {
                                        if (!json.error && json.post) {
                                            console.log(I18n.t('console.posted') + JSON.stringify(json.post));
                                            window.location.href = '/post' + json.post.id;
                                        } else {
                                            console.error('Error: ' + json.error);
                                            setUploadError(json.error);
                                        }
                                    }, err => {
                                        console.error("Error: " + JSON.stringify(err));
                                        setUploadError(err);
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
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      setFieldValue
                      /* and other goodies */
                  }) => (

                    <Form onSubmit={handleSubmit}>
                        <label htmlFor="title">{I18n.t('ui.form.title')}</label>
                        <input
                            type="text"
                            name="title"
                            id={'title'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                        />

                        <label id="category_label">{I18n.t('ui.form.category')}</label>
                        <div role="group" aria-labelledby="category_label">
                            <label>
                                <Field type="radio" name="category" value="0" />
                                {I18n.t('ui.form.categories.meme')}
                            </label>
                            <label>
                                <Field type="radio" name="category" value="1" />
                                {I18n.t('ui.form.categories.fail')}
                            </label>
                            <label>
                                <Field type="radio" name="category" value="2" />
                                {I18n.t('ui.form.categories.gif')}
                            </label>
                        </div>

                        <label htmlFor="image">{I18n.t('ui.form.profile_picture')}</label>
                        <input id="image" accept="image/*" name="image" type="file" onChange={(event) => {
                            setFieldValue("image", event.currentTarget.files[0]);
                        }}/>

                        <ul className="errors">
                            {errors.title && touched.title && <li>{errors.title}</li>}
                            {errors.image && touched.image && <li>{errors.image}</li>}
                            {uploadError && <li>{uploadError}</li>}
                        </ul>
                        <button type="submit" disabled={isSubmitting}>
                            {I18n.t('ui.form.submit.post')}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default NewPostForm;
