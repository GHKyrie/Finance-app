import cl1 from '../../shared/Wrapper.module.css';
import classes from "./MainPage.module.css";
import Menu from "./components/Menu/Menu";
import TransactionsBlock from "./components/TransactionsBlock/TransactionsBlock";
import DiagramBlock from "./components/DiagramBlock/DiagramBlock";
import {useEffect, useState} from "react";
import axios from "axios";

function MainPage(props) {

    const [data, setData] = useState();
    const [hasLoaded, setHasLoaded] = useState();
    const [iter, setIter] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = JSON.stringify({
                "uid": sessionStorage.uid,
                "begin": "2000-07-19 00:07:20",
                "end": "2070-07-20 02:07:20"
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

            if (sessionStorage.reloads < 1) window.location.reload();
                sessionStorage.reloads++;
        };

        fetchData();
    }, [iter]);

    return hasLoaded && iter > 0 ? (
        <div className={cl1.wrapper}>
            <div className={classes.page}>
                <h1>Finance App</h1>
                <DiagramBlock data={data} />
                <TransactionsBlock data={data} />
                <Menu />
            </div>
        </div>
    ) : <div className={classes.transactionsBlock}>Loading...</div>
}

export default MainPage;