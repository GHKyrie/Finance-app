import wrapcl from '../../shared/Wrapper.module.css';
import cl from '../SharedComponents/AuthForm.module.css';
import {useFormik} from "formik";
import * as React from "react";
import {Link, useHistory} from 'react-router-dom';
import formcl from './components/LoginField.module.css';
import showpasscl from './components/ShowPass.module.css';
import authcl from '../SharedComponents/AuthButton.module.css';
import nusercl from "./components/NewUser.module.css";
import axios from "axios";

function LoginPage(props) {
    sessionStorage.uid = undefined;

    const history = useHistory();

    const validate = e => {
        if (e.target.id === "email")
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)) {
                e.target.classList.remove(formcl.success);
                e.target.classList.add(formcl.error);
                sessionStorage.email = false;
            } else {
                e.target.classList.remove(formcl.error);
                e.target.classList.add(formcl.success);
                sessionStorage.email = true;
            }

        if (e.target.id === "password")
            if (!e.target.value) {
                e.target.classList.remove(formcl.success);
                e.target.classList.add(formcl.error);
                sessionStorage.password = false;
            } else {
                e.target.classList.remove(formcl.error);
                e.target.classList.add(formcl.success);
                sessionStorage.password = true;
            }

    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        handleSubmit: values => {
            const fetchID = async () => {
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

                sessionStorage.uid = result.data;
                sessionStorage.reloads = 0;
            }
            fetchID();
        }
    });

    return (
        <div className={wrapcl.wrapper}>
            <form className={cl.authForm} onSubmit={ (e) => { e.preventDefault(); formik.handleSubmit(e) }}>
                <h2>FINANCE APP</h2>
                <input
                    className={formcl.field}
                    id="email"
                    type={"email"}
                    placeholder={"почта"}
                    onBlur={validate}
                    onChange={formik.handleChange}
                    defaultValue={formik.values.email}
                />
                <input
                    className={formcl.field}
                    id="password"
                    type="password"
                    placeholder={"пароль"}
                    onBlur={validate}
                    onChange={formik.handleChange}
                    defaultValue={formik.values.password}
                />
                <div className={showpasscl.spas}>
                    <input type={"checkbox"} name={"s_pass"}/>
                    <label htmlFor="s_pass">Запомнить пароль</label>
                </div>
                <button className={authcl.auth} type={"submit"}>Авторизоваться</button>
                <Link to={"/signup"}>
                    <button className={nusercl.new}>Создать аккаунт</button>
                </Link>
            </form>
        </div>
    );
}

export default LoginPage;