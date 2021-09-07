import cl1 from '../../shared/Wrapper.module.css';
import {useEffect, useState} from "react";
import axios from "axios";
import cls from "../MainPage/MainPage.module.css";
import Transaction from "../MainPage/components/TransactionsBlock/Transaction/Transaction";
import authcl from "../SharedComponents/AuthButton.module.css";
import {Link} from "react-router-dom";

function TransactionsPage(props) {
    const [data, setData] = useState();
    const [hasLoaded, setHasLoaded] = useState();

    useEffect(() => {
        const fetchData = async () => {
            let config;
            let data;

            if (!sessionStorage.exin) {
                data = JSON.stringify({
                    "uid": sessionStorage.uid,
                });
                config = {
                    method: 'post',
                    url: 'http://localhost:5001/gettransactions',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
            }
            if (sessionStorage.exin) {
                data = JSON.stringify({
                    "uid": sessionStorage.uid,
                    "exin": sessionStorage.exin
                });
                config = {
                    method: 'post',
                    url: 'http://localhost:5001/gettransactionsexin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
            }

            const result = await axios(config);

            setData(result.data);
            setHasLoaded(true);
        };

        fetchData();
    }, []);

    return hasLoaded ? (
        <div className={cl1.wrapper}>
            <div>
                {data.map(item => {
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
                <Link to={"/app"}>
                    <button className={authcl.auth + " " + authcl.lone}>Вернуться</button>
                </Link>
            </div>
        </div>
    ) : <div className={cls.transactionsBlock}>Loading...</div>
}

export default TransactionsPage;