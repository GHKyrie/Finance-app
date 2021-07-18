import classes from "./Fline.module.css";

function Fline(props) {
    return(
        <div className={classes.Fline}>
            <div className={classes.transTitle}>Транзакции</div>
            <div className={classes.expand}>Показать все</div>
        </div>
    );
}

export default Fline;