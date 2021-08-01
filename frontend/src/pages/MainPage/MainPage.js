import cl1 from '../../shared/Wrapper.module.css';
import classes from "./MainPage.module.css";
import Menu from "./components/Menu/Menu";
import TransactionsBlock from "./components/TransactionsBlock/TransactionsBlock";
import DiagramBlock from "./components/DiagramBlock/DiagramBlock";
import instance from "../../api/config";
import axios from "axios";

function MainPage(props) {

    var data = JSON.stringify({
        "uid": "38",
        "begin": "2021-07-19 00:07:20",
        "end": "2021-07-19 02:07:20"
    });

    var config = {
        method: 'get',
        url: 'http://localhost:5001/transactions',
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

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