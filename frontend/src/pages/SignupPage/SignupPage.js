import "./SignupPage.module.css";
import cl2 from "../SharedComponents/AuthForm.module.css";
import cl1 from '../../shared/Wrapper.module.css';
import AuthButton from "../SharedComponents/AuthButton";
import NewUser from "../LoginPage/components/NewUser";
import LoginField from "../LoginPage/components/LoginField";
import {Link} from "react-router-dom";

function SignupPage(props) {
    return (
        <div className={cl1.wrapper}>
            <div className={cl2.authForm}>
                <h2>FINANCE APP</h2>
                <LoginField type={"text"} placeholder={"никнейм"}/>
                <LoginField type={"email"} placeholder={"почта"}/>
                <LoginField type={"password"} placeholder={"пароль"}/>
                <LoginField type={"password"} placeholder={"повторите пароль"}/>
                <AuthButton text={"Зарегистрироваться"}/>
                <Link to="/login">
                    <NewUser text={"Уже есть аккаунт?"}/>
                </Link>

            </div>
        </div>
    );
}

export default SignupPage;