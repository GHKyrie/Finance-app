import {Formik, useFormik} from "formik";
import * as React from "react";
import wcl from '../../shared/Wrapper.module.css';
import fcl from "./components/LoginField.module.css";
import acl from "../SharedComponents/AuthButton.module.css";
import cl from "../SharedComponents/AuthForm.module.css";
import nusercl from "./components/NewUser.module.css";
import {Link} from "react-router-dom";

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
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate,
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));
        }
    });

    return (
        <Formik
            initialValues={{email: '', password: ''}}
            validate={validate}
            onSubmit={(values, {setSubmitting}) => {
                console.log(JSON.stringify(values, null, 2));
                setSubmitting(false);
            }}
        >
            {formik => (
                <div className={wcl.wrapper}>
                    <form onSubmit={formik.handleSubmit} className={cl.authForm}>
                        <h2>FINANCE APP</h2>
                        <input
                            className={fcl.field}
                            id="email"
                            type="email"
                            placeholder={"почта"}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                        <input
                            className={fcl.field}
                            id="password"
                            type="password"
                            placeholder={"пароль"}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}
                        <button className={acl.auth} type="submit">Авторизоваться</button>
                        <Link to={"/signup"}>
                            <button className={nusercl.new}>Создать аккаунт</button>
                        </Link>
                    </form>
                </div>
            )}
        </Formik>
    );
}

export default LoginFormik;