import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import * as React from "react";
import wcl from '../../shared/Wrapper.module.css';
import fcl from "../LoginPage/components/LoginField.module.css";
import acl from "../SharedComponents/AuthButton.module.css";
import cl from "../SharedComponents/AuthForm.module.css";
import nusercl from "../LoginPage/components/NewUser.module.css";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

const regreq = async values => {
    const data = JSON.stringify({
        "login": values.login,
        "password": values.password,
        "email": values.email
    });

    const config = {
        method: 'post',
        url: 'http://localhost:5001/registration',
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
    btn.innerText = "Зарегистрироваться";

    if (!values.login) {
        errors.login = 'Ввод обязателен';
    } else if (values.login.length > 20) {
        errors.login = 'Логин должен быть не длиннее 20 символов';
    }

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

    if (!values.confpass) {
        errors.confpass = 'Ввод обязателен';
    } else if (values.confpass != values.password) {
        errors.confpass = 'Пароли должны совпадать';
    }

    return errors;
}

function SignupPageFormik(props) {
    const history = useHistory();

    return (
        <Formik
            initialValues={{login: '', email: '', password: '', confpass: ''}}
            validate={validate}
            onSubmit={async (values, {setSubmitting}) => {
                const btn = document.getElementsByClassName(acl.auth)[0];

                try {
                    const res = await regreq(values);

                    if (res.status == "200")
                    {
                        btn.innerText = "Подождите немного...";
                        setTimeout(() => { history.push("/login") }, 500);
                    }
                } catch (e) {
                    btn.innerText = "Ошибка регистрации";
                }

                setSubmitting(false);
            }}
        >
            <div className={wcl.wrapper}>
                <Form className={cl.authForm + " " + cl.regForm}>
                    <h2>FINANCE APP</h2>

                    <Field className={fcl.field}
                           name="login"
                           placeholder="Логин"
                           type="text"
                           autoComplete="off"
                    />
                    <ErrorMessage name="login"/>

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

                    <Field className={fcl.field}
                           name="confpass"
                           placeholder="Повторите пароль"
                           type="password"
                           autoComplete="off"
                    />
                    <ErrorMessage name="confpass"/>

                    <button className={acl.auth} type="submit">Зарегистрироваться</button>

                    <Link to={"/signup"}>
                        <button className={nusercl.new}>Уже есть аккаунт?</button>
                    </Link>
                </Form>
            </div>
        </Formik>
    );
}

export default SignupPageFormik;