import classes from "./Menu.module.css";
import {Link} from "react-router-dom";
import authcl from "../../../SharedComponents/AuthButton.module.css";

function Menu(props) {
    return(
        <nav className={classes.menu}>
            <Link to="/login">
                <button className={classes.item}
                        className={authcl.auth}>Доходы</button>
            </Link>
            <Link to="/signup">
                <button className={classes.item}
                        className={authcl.auth}>Расходы</button>
            </Link>
        </nav>
    );
}

export default Menu;