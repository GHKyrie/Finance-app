import classes from "./Fline.module.css";

function Fline(props) {
    return(
        <div className={classes.Fline}>
            <div className={classes.transTitle}>Транзакции</div>
            <button className={classes.expand}>Показать все</button>
        </div>
    );
}

export default Fline;