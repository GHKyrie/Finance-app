import classes from "./Menu.module.css";
import {Link} from "react-router-dom";
import authcl from "../../../SharedComponents/AuthButton.module.css";

function Menu(props) {
    const exin0 = () => { // Expenses
        sessionStorage.exin = 0;
    }

    const exin1 = () => { // Income
        sessionStorage.exin = 1;
    }

    return(
        <nav className={classes.menu}>
            <Link to="/transactions">
                <button className={classes.item}
                        onClick={exin1}
                        className={authcl.auth}>Доходы</button>
            </Link>
            <Link to="/transactions">
                <button className={classes.item}
                        onClick={exin0}
                        className={authcl.auth}>Расходы</button>
            </Link>
        </nav>
    );
}

export default Menu;