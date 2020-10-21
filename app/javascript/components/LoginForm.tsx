import React, {Dispatch, FunctionComponent, SetStateAction, useState} from 'react';
import {Formik} from 'formik';
import I18n from "i18n-js";
import Api from "../base/Api";

type Props = {
    toggleReload: Dispatch<SetStateAction<boolean>>,
}

function emailInvalid(email: string): boolean {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
}

const LoginForm: FunctionComponent<Props> = ({toggleReload}: Props) => {
    return (
        <div id={'login-form'}>
            <h1>{I18n.t('ui.heading.login')}</h1>

            <Formik
                initialValues={{email: '', password: ''}}
                validate={values => {
                    const errors = {
                        email: undefined,
                        password: undefined,
                    };
                    if (!values.email) {
                        errors.email = I18n.t('error.email_required');
                    } else if (emailInvalid(values.email)) {
                        errors.email = I18n.t('error.email_invalid');
                    }
                    if (!values.password) {
                        errors.password = I18n.t('error.password_required');
                    }
                    return errors;
                }}

                onSubmit={(values, {setSubmitting}) => {
                    console.log('Login...');
                    setSubmitting(true);
                    Api({
                        path: '/login', fetchOptions: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(values),
                        }
                    }).then(
                        res => {
                            if (res.status == 200) {
                                res.json().then(
                                    json => {
                                        console.log(I18n.t('console.logged_in') + json);
                                        toggleReload(true);
                                    }, err => {
                                        console.error("Error: " + JSON.stringify(err)) // TODO: error handling
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
                        <label htmlFor="password">{I18n.t('ui.form.password')}</label>
                        <input
                            type="password"
                            name="password"
                            id={'password'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        <ul className="errors">
                            {errors.email && touched.email && <li>{errors.email}</li>}
                            {errors.password && touched.password && <li>{errors.password}</li>}
                        </ul>
                        <button type="submit" disabled={isSubmitting}>
                            Login
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default LoginForm;
