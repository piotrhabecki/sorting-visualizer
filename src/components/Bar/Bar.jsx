import React from 'react';
import classes from "../SortingVisualizer/SortingVisualizer.module.css";

const Bar = (props) => {
    return (
        <div
        id={props.index}
        style={{ height: `${props.height}px`, backgroundColor: `${props.color}` }}
        className={classes.array__bar}
      ></div>
    );
};

export default Bar;