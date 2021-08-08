import classes from "./TransactionsBlock.module.css";
import Fline from "./Fline/Fline";
import {useEffect, useState} from "react";
import Transaction from "./Transaction/Transaction";

function TransactionsBlock(props) {
    let [text, setText] = useState();
    let [price, setPrice] = useState();
    let [date, setDate] = useState();

    let [data_, setData] = useState();

    const [hasLoaded, setHasLoaded] = useState();

    useEffect(() => {
        let data;

        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "uid": "38",
            "begin": "1970-07-19 00:07:20",
            "end": "2080-07-19 02:07:20"
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5001/gettransactions", requestOptions)
            .then(response => response.text())
            .then(result => {
                setHasLoaded(true);
                setData(result);

                data = JSON.parse(result);

                setText(data[0].tag);
                setPrice(data[0].amount);
                setDate(data[0].datetime);
            })
            .then(console.log(data_))
            .catch(error => console.log('error', error));
    }, []);

    // console.log(data_+'1');

    return hasLoaded ? (
        <div className={classes.transactionsBlock}>
            <Fline/>
            <Transaction
                text={text}
                price={price}
                date={date}
            />
            <Transaction
                text={text}
                price={price}
                date={date}
            />
        </div>
    ) : <div className={classes.transactionsBlock}>Loading...</div>
}

export default TransactionsBlock;