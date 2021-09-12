import cl1 from '../../shared/Wrapper.module.css';
import {useEffect, useState} from "react";
import axios from "axios";
import Transaction from "../MainPage/components/TransactionsBlock/Transaction/Transaction";
import authcl from "../SharedComponents/AuthButton.module.css";
import {Link} from "react-router-dom";
import cls from './TransactionsPage.module.css';

function TransactionsPage(props) {
    const generateSums = (data) => {
        let expenses = 0;
        let income = 0;
        let sum;

        data.forEach(item => {
            if (item.exin == 0)
                expenses += item.amount;
            else
                income += item.amount;
        });

        sum = income - expenses;

        console.log(sum);
        console.log(income);
        console.log(expenses);

        return [sum, income, expenses];
    }

    const [data, setData] = useState();
    const [sums, setSums] = useState();
    const [hasLoaded, setHasLoaded] = useState();

    useEffect(() => {
        const fetchData = async () => {
            let config;
            let data;

            if (props.type == "all") {
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
            if (props.type == "exin") {
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
            setSums(generateSums(result.data));
            setHasLoaded(true);
        };

        fetchData();
    }, []);

    return hasLoaded ? (
        <div className={cl1.wrapper}>
            <div className={cls.container}>
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
            </div>


            <div className={cls.sum}>
                <div className={cls}>
                    <h3>Итого: {sums[0]}</h3>
                    <h4>Доход: {sums[1]}</h4>
                    <h4>Расходы: {sums[2]}</h4>
                </div>

                <Link to={"/app"}>
                    <button className={authcl.auth + " " + authcl.lone}>Вернуться</button>
                </Link>
            </div>
        </div>
    ) : <div>Loading...</div>
}

export default TransactionsPage;