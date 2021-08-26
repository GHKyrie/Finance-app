import classes from "./Fline.module.css";
import {Link} from "react-router-dom";
function Fline(props) {
    return(
        <div className={classes.Fline}>
            <div className={classes.transTitle}>Транзакции</div>
            <Link to={"/transactions"}>
                <button className={classes.expand}>Показать все</button>
            </Link>
        </div>
    );
}

export default Fline;