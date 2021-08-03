import cl1 from '../../shared/Wrapper.module.css';
import classes from "./MainPage.module.css";
import Menu from "./components/Menu/Menu";
import TransactionsBlock from "./components/TransactionsBlock/TransactionsBlock";
import DiagramBlock from "./components/DiagramBlock/DiagramBlock";

function MainPage(props) {
    return (
        <div className={cl1.wrapper}>
            <div className={classes.page}>
                <h1>Finance App</h1>
                <DiagramBlock />
                <TransactionsBlock />
                <Menu />
            </div>
        </div>
    );
}

export default MainPage;