import classes from './TotalStats.module.css';

function TotalStats(props) {
    return(
        <div className={classes.totalStats}>
            <div className={classes.income}>
                <h2>Доходы</h2>
                <p>R 9666</p>
            </div>
            <div className={classes.expenses}>
                <h2>Расходы</h2>
                <p>R 8392</p>
            </div>
        </div>
    );
}

export default TotalStats;