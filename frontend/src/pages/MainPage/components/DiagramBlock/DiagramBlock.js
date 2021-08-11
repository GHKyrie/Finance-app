import classes from './DiagramBlock.module.css';
import Total from "./Total/Total";
import TotalStats from "./TotalStats/TotalStats";
import Pie from "../D3/PieChart";
import {useEffect, useState} from "react";

const generateData = (data) => (
    data.map(item => ({
        date: item.tag,
        value: item.amount
    }))
)

function DiagramBlock(props) {

    const [data, setData] = useState(generateData(props.data));

    useEffect(() => {
        setData(generateData(props.data));
    }, [!data]);

    return (
        <div className={classes.diagramBlock}>
            <div className={classes.diagram}>
                <Pie
                    data={data}
                    width={200}
                    height={200}
                    innerRadius={0}
                    outerRadius={120}
                />
            </div>
            <Total/>
            <TotalStats/>
        </div>
    );


}

export default DiagramBlock;