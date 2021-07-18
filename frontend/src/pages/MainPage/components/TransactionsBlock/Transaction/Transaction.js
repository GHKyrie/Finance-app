import classes from "./Transaction.module.css";

function Transaction(props) {
    return(
        <div className={classes.transaction}>
            <p className={classes.target}>{props.text}</p>
            <p className={classes.price}>{props.price}</p>
            <p className={classes.date}>{props.date}</p>
        </div>
    );
}

export default Transaction;