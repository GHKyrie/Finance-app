import cl from '../../shared/Wrapper.module.css';
import classes from '../SharedComponents/AuthForm.module.css';
import LoginField from "./components/LoginField/LoginField";
import AuthButton from "../SharedComponents/AuthButton";
import NewUser from "./components/NewUser/NewUser";
import ShowPass from "./components/ShowPass/ShowPass";
import {Link} from "react-router-dom";

function LoginPage(props) {
    return (
        <div className={cl.wrapper}>
            <div className={classes.authForm}>
                <h2>FINANCE APP</h2>
                <LoginField type={"email"} placeholder={"почта"}/>
                <LoginField type={"password"} placeholder={"пароль"}/>
                <ShowPass text={"запомнить пароль"}/>
                <Link to="/app">
                    <AuthButton text={"Авторизоваться"}/>
                </Link>
                <Link to="/signup">
                    <NewUser text={"Новый пользователь?"}/>
                </Link>
            </div>
        </div>
    );
}

export default LoginPage;