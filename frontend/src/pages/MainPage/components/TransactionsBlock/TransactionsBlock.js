import classes from "./TransactionsBlock.module.css";
import Fline from "./Fline/Fline";
import {useEffect, useState} from "react";
import Transaction from "./Transaction/Transaction";
import axios from "axios";

function TransactionsBlock(props) {
    const [data, setData] = useState();
    const [hasLoaded, setHasLoaded] = useState();
    const [iter, setIter] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            console.log(sessionStorage.uid + ' = uid');
            
            const data = JSON.stringify({
                "uid": sessionStorage.uid,
                "begin": "2000-07-19 00:07:20",
                "end": "2070-07-19 02:07:20"
            });


            const config = {
                method: 'post',
                url: 'http://localhost:5001/gettransactions',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result = await axios(config);

            setData(result.data);
            setIter(iter + 1);
            setHasLoaded(true);
        };

        fetchData();
    }, []);

    return hasLoaded && iter > 0 ? (
        <div className={classes.transactionsBlock}>
            <Fline/>
            {console.log(data)}
            {console.log(iter)}
            {data.map(item => (
                <Transaction key={item.datetime}
                             text={item.tag}
                             price={item.amount}
                             date={item.datetime}
                />
            ))}
        </div>
    ) : <div className={classes.transactionsBlock}>Loading...</div>
}

export default TransactionsBlock;