import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import * as React from "react";
import wcl from '../../shared/Wrapper.module.css';
import fcl from "./components/LoginField.module.css";
import acl from "../SharedComponents/AuthButton.module.css";
import cl from "../SharedComponents/AuthForm.module.css";
import nusercl from "./components/NewUser.module.css";
import {Link} from "react-router-dom";

async function fetchData(a, b) {
    await new Promise((r) => setTimeout(r, 500));
    return `textA: ${a}, textB: ${b}`;
}

const validate = values => {
    const errors = {};

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

function LoginFormik(props) {
    return (
        <Formik
            initialValues={{email: '', password: ''}}
            validate={validate}
            onSubmit={async (values, {setSubmitting}) => {
                await new Promise((r) => setTimeout(r, 5));
                console.log(JSON.stringify(values, null, 2));
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
                    />
                    <ErrorMessage name="email"/>

                    <Field className={fcl.field}
                           name="password"
                           placeholder="Пароль"
                           type="password"
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

export default LoginFormik;