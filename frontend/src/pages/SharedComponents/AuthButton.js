import classes from "./AuthButton.module.css";

function AuthButton(props) {
    return(
        <button className={classes.auth}>{props.text}</button>
    );
}

export default AuthButton;