import classes from "./Fline.module.css";
import {Link} from "react-router-dom";
function Fline(props) {
    const clearExin = () => {
        sessionStorage.exin = undefined;
        console.log(sessionStorage.exin);
    }

    return(
        <div className={classes.Fline}>
            <div className={classes.transTitle}>Транзакции</div>
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