import classes from './DiagramBlock.module.css';
import Total from "./Total/Total";
import TotalStats from "./TotalStats/TotalStats";
import Pie from "../D3/PieChart";
import {useEffect, useState} from "react";

const generateData = (data) => (
    data.map(item => ({
        text: item.tag,
        value: item.amount
    }))
)

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

    return [sum, income, expenses];
}

function DiagramBlock(props) {

    const [data, setData] = useState(generateData(props.data));
    const [sums, setSums] = useState(generateSums(props.data));

    useEffect(() => {
        setData(generateData(props.data));
        setSums(generateSums(props.data));
    }, [!data, !sums]);

    return (
        <div className={classes.diagramBlock}>
            <div className={classes.diagram}>
                <Pie
                    data={data}
                    width={320}
                    height={320}
                    innerRadius={0}
                    outerRadius={160}
                />
            </div>
            <Total data={sums[0]}/>
            <TotalStats data={sums}/>
        </div>
    );


}

export default DiagramBlock;