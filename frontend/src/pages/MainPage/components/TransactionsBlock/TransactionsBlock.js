import cl from "./TransactionsBlock.module.css";
import Fline from "./Fline/Fline";
import Transaction from "./Transaction/Transaction";

function TransactionsBlock(props) {
    return (
        <div className={cl.transactionsBlock}>
            {props.data.map(item => {
                    const date = new Date(Date.parse(item.datetime));
                    const year = date.getFullYear();

                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    let hours = date.getHours();
                    let minutes = date.getMinutes();

                    if (month < 10) month = '0' + month;
                    if (day < 10) day = '0' + day;
                    if (hours < 10) hours = '0' + hours;
                    if (minutes < 10) minutes = '0' + minutes;

                    const dateStr = `${day}.${month}.${year} ${hours}:${minutes}`;

                    return (
                        <Transaction key={item.id}
                                     text={item.tag}
                                     price={'₽ ' + item.amount}
                                     date={dateStr}
                        />
                    )
                }
            )}
            <Fline/>
        </div>
    );
}

export default TransactionsBlock;