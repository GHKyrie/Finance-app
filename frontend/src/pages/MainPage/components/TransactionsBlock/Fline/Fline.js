import classes from "./Fline.module.css";
import {Link} from "react-router-dom";
function Fline(props) {
    const clearExin = () => {
        sessionStorage.exin = undefined;
        console.log(sessionStorage.exin);
    }

    const newTransaction = () => {
        console.log(1);
    }

    return(
        <div className={classes.Fline}>
            <button onClick={newTransaction}
                className={classes.transTitle}>
                Добавить транзакцию
            </button>
            <Link to={"/transactions"}>
                <button
                    className={classes.expand}
                    onClick={clearExin}
                >
                    Показать все
                </button>
            </Link>
        </div>
    );
}

export default Fline;