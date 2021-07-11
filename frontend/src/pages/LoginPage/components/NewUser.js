import classes from "./NewUser.module.css";

function NewUser(props) {
    return (
        <button className={classes.new}>{props.text}</button>
    );
}

export default NewUser;