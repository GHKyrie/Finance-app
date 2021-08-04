import wrapcl from '../../shared/Wrapper.module.css';
import cl from '../SharedComponents/AuthForm.module.css';
import {useFormik} from "formik";
import * as React from "react";
import {Link, useHistory} from 'react-router-dom';
import formcl from './components/LoginField.module.css';
import showpasscl from './components/ShowPass.module.css';
import authcl from '../SharedComponents/AuthButton.module.css';
import nusercl from "./components/NewUser.module.css";

function LoginPage(props) {

const formik = useFormik({
    initialValues: {
        email: '',
        password: ''
    },
    onSubmit: values => {
        console.log(JSON.stringify(values, null, 2));

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": values.email,
            "password": values.password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5001/authorization", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result + "_login1"))
            .catch(error => console.log('error', error));
    },
});

const history = useHistory();

const request = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": "nemasterya@gmail.com",
        "password": "kekmachineactivated"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:5001/authorization", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result + "_login2"))
        .catch(error => console.log('error', error));
}

const redirect = (e) => {
    e.preventDefault();
    formik.handleSubmit();

    const path = 'app';
    history.push(path);
};

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
            <button onClick={request}></button>
        </form>
    </div>
);
}

export default LoginPage;