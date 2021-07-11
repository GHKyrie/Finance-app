import classes from "./ShowPass.module.css";

function ShowPass(props) {
    return (
        <div className={classes.spas}>
            <input type={"checkbox"} name={"s_pass"} />
            <label htmlFor="s_pass">{props.text}</label>
        </div>
    );
}

export default ShowPass;