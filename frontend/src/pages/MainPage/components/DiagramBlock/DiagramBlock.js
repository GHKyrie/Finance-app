import classes from './DiagramBlock.module.css';
import Total from "./Total/Total";
import TotalStats from "./TotalStats/TotalStats";

function DiagramBlock(props) {
    return (
        <div className={classes.diagramBlock}>
            <div className={classes.diagram}>Diagram</div>
            <Total/>
            <TotalStats/>
        </div>
    );
}

export default DiagramBlock;