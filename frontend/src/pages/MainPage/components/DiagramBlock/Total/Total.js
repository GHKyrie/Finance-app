import classes from './Total.module.css';

function Total(props) {
    return(
        <div className={classes.total}>
            <h2>Общая сумма</h2>
            <p>R 1274</p>
        </div>
    );
}

export default Total;