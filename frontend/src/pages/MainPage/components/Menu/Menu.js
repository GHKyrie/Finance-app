import classes from "./Menu.module.css";
import {Link} from "react-router-dom";
import AuthButton from "../../../SharedComponents/AuthButton";

function Menu(props) {
    return(
        <nav className={classes.menu}>
            <Link to="/login">
                <AuthButton text={"Доходы"} className={classes.item} />
            </Link>
            <Link to="/signup">
                <AuthButton text={"Расходы"} className={classes.item} />
            </Link>
        </nav>
    );
}

export default Menu;