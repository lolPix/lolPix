import React, {FunctionComponent, useState} from 'react';
import {Formik} from 'formik';
import I18n from "i18n-js";
import Api from "../../base/Api";

type FormValues = {
    username: string,
    password: string,
    email: string,
    bio: string,
    image: string | Blob
}

type FormErrors = {
    username?: string,
    password?: string,
    email?: string,
    bio?: string,
    image?: string
}

function emailInvalid(email: string): boolean {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
}

function buildFormData(values: FormValues): FormData {
    const data = new FormData();
    data.append('image', values.image)
    data.append('username', values.username)
    data.append('password', values.password)
    data.append('email', values.email)
    data.append('bio', values.bio)
    return data;
}

const RegistrationForm: FunctionComponent = () => {
    const [registrationError, setRegistrationError] = useState(undefined);
    return (<div id={'registration-form'}>
            <h1>{I18n.t('ui.heading.join')}</h1>

            <Formik
                initialValues={{username: '', email: '', password: '', bio: '', image: undefined}}
                validate={values => {
                    const errors: FormErrors = {};
                    if (!values.email) {
                        errors.email = I18n.t('error.email_required');
                    } else if (emailInvalid(values.email)) {
                        errors.email = I18n.t('error.email_invalid');
                    }
                    if (!values.password) {
                        errors.password = I18n.t('error.password_required');
                    }
                    if (values.password.length <= 8) {
                        errors.password = I18n.t('error.password_too_short');
                    }
                    if (!values.image) {
                        errors.image = I18n.t('error.image_required');
                    } else if (values.image.size > 2097152) {
                        errors.image = I18n.t('error.image_too_large');
                    }
                    if (!values.bio) {
                        errors.bio = I18n.t('error.bio_required');
                    }
                    if (!values.username) {
                        errors.username = I18n.t('error.username_required');
                    } else if(values.username.length <=5 ){
                        errors.username = I18n.t('error.username_too_short');
                    }
                    return errors;
                }}

                onSubmit={(values, {setSubmitting}) => {
                    console.log(I18n.t('console.registration'));
                    setSubmitting(true);
                    const data = buildFormData(values);
                    Api({
                        path: '/register',
                        method: 'POST',
                        body: data
                    }).then(
                        res => {
                            if (res.status === 200) {
                                res.json().then(
                                    json => {
                                        if (!json.error && json.token && json.user) {
                                            console.log(I18n.t('console.registered') + JSON.stringify(json.user));
                                            window.location.href = '/login';
                                        } else {
                                            console.error('Error: ' + json.error);
                                            setRegistrationError(json.error);
                                        }
                                    }, err => {
                                        console.error("Error: " + JSON.stringify(err));
                                        setRegistrationError(err);
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

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">{I18n.t('ui.form.email')}</label>
                        <input
                            type="email"
                            name="email"
                            id={'email'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        <label htmlFor="username">{I18n.t('ui.form.username')}</label>
                        <input
                            type="text"
                            name="username"
                            id={'username'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                        />
                        <label htmlFor="password">{I18n.t('ui.form.password')}</label>
                        <input
                            type="password"
                            name="password"
                            id={'password'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        <label htmlFor="image">{I18n.t('ui.form.profile_picture')}</label>
                        <input id="image" accept="image/*" name="image" type="file" onChange={(event) => {
                            setFieldValue("image", event.currentTarget.files[0]);
                        }}/>
                        <label htmlFor="bio">{I18n.t('ui.form.bio')}</label>
                        <textarea name="bio" id="bio" cols={30} rows={5}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.bio} />
                        <ul className="errors">
                            {errors.email && touched.email && <li>{errors.email}</li>}
                            {errors.password && touched.password && <li>{errors.password}</li>}
                            {errors.username && touched.username && <li>{errors.username}</li>}
                            {errors.bio && touched.bio && <li>{errors.bio}</li>}
                            {errors.image && touched.image && <li>{errors.image}</li>}
                            {registrationError && <li>{registrationError}</li>}
                        </ul>
                        <button type="submit" disabled={isSubmitting}>
                            {I18n.t('ui.form.submit.register')}
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default RegistrationForm;
