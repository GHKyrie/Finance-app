import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import * as React from "react";
import wcl from '../../../shared/Wrapper.module.css';
import fcl from "./LoginField.module.css";
import acl from "../../SharedComponents/AuthButton.module.css";
import cl from "../../SharedComponents/AuthForm.module.css";
import nusercl from "./NewUser.module.css";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

const setID = async values => {
    const data = JSON.stringify({
        "email": values.email,
        "password": values.password
    });

    const config = {
        method: 'post',
        url: 'http://localhost:5001/authorization',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    const result = await axios(config);

    return result;
}

const validate = values => {
    const errors = {};

    const btn = document.getElementsByClassName(acl.auth)[0];
    btn.innerText = "Авторизоваться";

    if (!values.email) {
        errors.email = 'Ввод обязателен';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Неверный формат почты';
    }

    if (!values.password) {
        errors.password = 'Ввод обязателен';
    } else if (values.password.length > 20) {
        errors.password = 'Пароль должен быть не длиннее 20 символов';
    }

    return errors;
}

function LoginPage(props) {
    const history = useHistory();

    return (
        <Formik
            initialValues={{email: '', password: ''}}
            validate={validate}
            onSubmit={async (values, {setSubmitting}) => {
                const btn = document.getElementsByClassName(acl.auth)[0];
                sessionStorage.uid = undefined;

                try {
                    const res = await setID(values);

                    sessionStorage.uid = res.data;

                    if (sessionStorage.uid && res.status == "200")
                        history.push("/app");

                } catch (e) {
                    btn.innerText = "Ошибка авторизации";
                }

                setSubmitting(false);
            }}
        >
            <div className={wcl.wrapper}>
                <Form className={cl.authForm}>
                    <h2>FINANCE APP</h2>

                    <Field className={fcl.field}
                           name="email"
                           placeholder="Почта"
                           type="email"
                           autoComplete="off"
                    />
                    <ErrorMessage name="email"/>

                    <Field className={fcl.field}
                           name="password"
                           placeholder="Пароль"
                           type="password"
                           autoComplete="off"
                    />
                    <ErrorMessage name="password"/>

                    <button className={acl.auth} type="submit">Авторизоваться</button>

                    <Link to={"/signup"}>
                        <button className={nusercl.new}>Создать аккаунт</button>
                    </Link>
                </Form>
            </div>
        </Formik>
    );
}

export default LoginPage;