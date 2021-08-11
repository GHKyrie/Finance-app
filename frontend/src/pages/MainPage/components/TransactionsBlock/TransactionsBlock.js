import classes from "./TransactionsBlock.module.css";
import Fline from "./Fline/Fline";
import Transaction from "./Transaction/Transaction";

function TransactionsBlock(props) {
    return (
        <div className={classes.transactionsBlock}>
            <Fline/>
            {props.data.map(item => (
                <Transaction key={item.id}
                             text={item.tag}
                             price={'-₽ ' + item.amount}
                             date={item.datetime}
                />
            ))}
        </div>
    );
}

export default TransactionsBlock;