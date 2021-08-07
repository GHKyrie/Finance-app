import "./SignupPage.module.css";
import cl2 from "../SharedComponents/AuthForm.module.css";
import cl1 from '../../shared/Wrapper.module.css';
import {Link, useHistory} from "react-router-dom";
import formcl from "../LoginPage/components/LoginField.module.css";
import * as React from "react";
import {useFormik} from "formik";
import authcl from "../SharedComponents/AuthButton.module.css";
import nusercl from "../LoginPage/components/NewUser.module.css";

function SignupPage(props) {

    const formik = useFormik({
        initialValues: {
            login: '',
            email: '',
            pass1: '',
            pass2: ''
        },
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 4));

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "login": values.login,
                "password": values.pass1,
                "email": values.email,
                "mobile": "89867044909"
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:5001/registration", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result + "_signup1"))
                .catch(error => console.log('error', error));
        },
    });

    const history = useHistory();

    const redirect = (e) => {
        e.preventDefault();
        formik.handleSubmit();

        const path = 'app';
        history.push(path);
    };

    return (
        <div className={cl1.wrapper}>
            <form className={cl2.authForm} onSubmit={redirect}>
                <h2>FINANCE APP</h2>
                <input
                    className={formcl.field}
                    id="login"
                    type={"text"}
                    placeholder={"логин"}
                    onChange={formik.handleChange}
                    defaultValue={formik.values.login}
                />
                <input
                    className={formcl.field}
                    id="email"
                    type="email"
                    placeholder={"почта"}
                    onChange={formik.handleChange}
                    defaultValue={formik.values.email}
                />
                <input
                    className={formcl.field}
                    id="pass1"
                    type={"password"}
                    placeholder={"введите пароль"}
                    onChange={formik.handleChange}
                    defaultValue={formik.values.pass1}
                />
                <input
                    className={formcl.field}
                    id="pass2"
                    type={"password"}
                    placeholder={"повторите пароль"}
                    onChange={formik.handleChange}
                    defaultValue={formik.values.pass2}
                />
                <button className={authcl.auth} type={"submit"}>Зарегистрироваться</button>
                <Link to="/login">
                    <button className={nusercl.new}>Уже есть аккаунт?</button>
                </Link>
            </form>
        </div>
    );
}

export default SignupPage;