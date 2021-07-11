import classes from './LoginField.module.css';

function LoginField(props) {
    return(
        <input
            type={props.type}
            placeholder={props.placeholder}
            className={classes.field}
        />
    );
}

export default LoginField;