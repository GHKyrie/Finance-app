import classes from "./Fline.module.css";
import {Link} from "react-router-dom";
import Modal from "../../../../TransactionsPage/Modal/Modal";

function Fline(props) {
    const clearExin = () => {
        sessionStorage.exin = undefined;
        console.log(sessionStorage.exin);
    }

    const newTransaction = () => {
        console.log(1);
    }

    return (
        <div className={classes.Fline}>
            <Link to={"/addtransaction"}>
                <button className={classes.transTitle}>
                    Добавить транзакцию
                </button>
            </Link>
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