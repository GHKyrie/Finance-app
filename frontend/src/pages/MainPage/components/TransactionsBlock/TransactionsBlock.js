import classes from "./TransactionsBlock.module.css";
import Fline from "./Fline/Fline";
import Transaction from "./Transaction/Transaction";

function TransactionsBlock(props) {
    return(
        <div className={classes.transactionsBlock}>
            <Fline />
            <Transaction
                text={"Транспорт"}
                price={"-R 60"}
                date={"вс, июн. 20, 2021"}
            />
            <Transaction
                text={"Перевод"}
                price={"-R 46"}
                date={"вс, июн. 22, 2021"}
            />
        </div>
    );
}

export default TransactionsBlock;