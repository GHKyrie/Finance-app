import classes from "./TransactionsBlock.module.css";
import Fline from "./Fline/Fline";
import {useEffect, useState} from "react";
import Transaction from "./Transaction/Transaction";

function TransactionsBlock(props) {
    let [text, setText] = useState();
    let [price, setPrice] = useState();
    let [date, setDate] = useState();

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

                data = JSON.parse(result);

                text = setText(data[0].tag);
                price = setPrice(data[0].amount);
                date = setDate(data[0].datetime);

                console.log(data);
                console.warn(text);
                console.warn(price);
                console.warn(date);
            })
            .catch(error => console.log('error', error));
    });


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