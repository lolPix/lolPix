import React, {FunctionComponent, useState} from 'react';
import {Field, Form, Formik} from 'formik';
import I18n from "i18n-js";
import Api from "../../base/Api";
import User from "../../model/user";

type FormValues = {
    title: string,
    alt_text: string,
    image: string | Blob,
    category: number
}

type FormErrors = {
    title?: string,
    image?: string,
    alt_text?: string,
    category?: string
}

type Props = {
    account: User,
}

function buildFormData(values: FormValues, account: User): FormData {
    const data = new FormData();
    data.append('image', values.image)
    data.append('alt_text', values.alt_text)
    data.append('title', values.title)
    data.append('category', values.category.toString(10))
    data.append('username', account.username)
    return data;
}

const NewPostForm: FunctionComponent<Props> = ({account}: Props) => {
    const [uploadError, setUploadError] = useState(undefined);
    return (<div id={'new-post-form'}>
            <h1 className={'page-heading'}>{I18n.t('ui.heading.new_post')}</h1>

            <Formik
                initialValues={{title: '', alt_text: '', image: undefined, category: undefined}}
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
                    if (!values.alt_text) {
                        errors.alt_text = I18n.t('error.alt_text_required');
                    } else if (values.alt_text.length < 8) {
                        errors.alt_text = I18n.t('error.alt_text_too_short');
                    }
                    return errors;
                }}

                onSubmit={(values, {setSubmitting}) => {
                    console.log(I18n.t('console.posting'));
                    setSubmitting(true);
                    Api({
                        path: '/posts',
                        method: 'POST',
                        body: buildFormData(values, account)
                    }).then(
                        res => {
                            if (res.status === 200 || res.status === 201) {
                                res.json().then(
                                    json => {
                                        if (!json.error && json.id) {
                                            console.log(I18n.t('console.posted') + JSON.stringify(json.post));
                                            window.location.href = '/post/' + json.id;
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
                      setFieldValue,
                      isValid
                      /* and other goodies */
                  }) => (

                    <Form onSubmit={handleSubmit}>
                        <label htmlFor="image">{I18n.t('ui.form.picture')}</label>
                        <input id="image" accept="image/*" name="image" type="file" onChange={(event) => {
                            setFieldValue("image", event.currentTarget.files[0]);
                        }}/>
                        <label htmlFor="title">{I18n.t('ui.form.title')}</label>
                        <input
                            type="text"
                            name="title"
                            id={'title'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                        />
                        <label htmlFor="alt_text">{I18n.t('ui.form.alt_text')}</label>
                        <input
                            type="text"
                            name="alt_text"
                            id={'alt_text'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.alt_text}
                        />
                        <label id="category_label">{I18n.t('ui.form.category')}</label>
                        <div role="radiogroup" aria-labelledby="category_label">
                            <label htmlFor={'category0'}>
                                <Field id={'category0'} type="radio" name="category" value="0"/>
                                {I18n.t('ui.form.categories.meme')}
                            </label>
                            <label htmlFor={'category1'}>
                                <Field id={'category1'} type="radio" name="category" value="1"/>
                                {I18n.t('ui.form.categories.fail')}
                            </label>
                            <label htmlFor={'category2'}>
                                <Field id={'category2'} type="radio" name="category" value="2"/>
                                {I18n.t('ui.form.categories.gif')}
                            </label>
                        </div>
                        <ul className="errors">
                            {errors.title && touched.title && <li>{errors.title}</li>}
                            {errors.image && touched.image && <li>{errors.image}</li>}
                            {uploadError && <li>{uploadError}</li>}
                        </ul>
                        <button type="submit" disabled={isSubmitting || !isValid}>
                            {I18n.t('ui.form.submit.post')}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default NewPostForm;
