import classes from './Total.module.css';

function Total(props) {
    return(
        <div className={classes.total}>
            <h2>Итого: </h2>
            <p>₽ {props.data}</p>
        </div>
    );
}

export default Total;