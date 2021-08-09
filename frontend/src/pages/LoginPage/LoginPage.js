import wrapcl from '../../shared/Wrapper.module.css';
import cl from '../SharedComponents/AuthForm.module.css';
import {useFormik} from "formik";
import * as React from "react";
import {Link, useHistory} from 'react-router-dom';
import formcl from './components/LoginField.module.css';
import showpasscl from './components/ShowPass.module.css';
import authcl from '../SharedComponents/AuthButton.module.css';
import nusercl from "./components/NewUser.module.css";
import {useEffect, useState} from "react";
import axios from "axios";

function LoginPage(props) {
const history = useHistory();

const redirect = (e) => {
    e.preventDefault();
    formik.handleSubmit();

    const path = 'app';
    setTimeout(history.push(path), 700)
};

const [uid, setUid] = useState();

const formik = useFormik({
    initialValues: {
        email: '',
        password: ''
    },
    onSubmit: values => {
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
            console.log(result.data + "_login")

            sessionStorage.uid = result.data;
            console.log(sessionStorage.uid);

            setUid(result.data);
        }
        fetchID();
    }
});

return (
    <div className={wrapcl.wrapper}>
        <form className={cl.authForm} onSubmit={redirect}>
            <h2>FINANCE APP</h2>
            <input
                className={formcl.field}
                id="email"
                type={"email"}
                placeholder={"почта"}
                onChange={formik.handleChange}
                defaultValue={formik.values.email}
            />
            <input
                className={formcl.field}
                id="password"
                type="password"
                placeholder={"пароль"}
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