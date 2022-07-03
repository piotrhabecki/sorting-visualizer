import React from "react";
import { Card, Button, Slider, Label, Navbar } from "@blueprintjs/core";
import { ALGORITHMS } from "../utils/const";

import classes from "./SortController.module.css";


const SortController = ({
  selectAlgo,
  sorting,
  setSorting,
  handleGenerateNewArray,
  selected,
  timer,
  setTimer,
  isFinished,
  quantity,
  onSetQuantity
}) => {
  const renderLabel = (val) => {
    return `${val}ms`;
  };

  return (
    <div className={classes.sort__controller__container}>
      <Card className={`bp4-dark ${classes.sort__controller__controllers}`}>
        <select name="algorithms" id="algo" onChange={event => {selectAlgo(event.target.value)}}>
          <option value={ALGORITHMS.BubbleSort}>
            Bubble Sort
          </option>
          <option value={ALGORITHMS.MergeSort}>
            Merge Sort
          </option>
        </select>
        {!sorting ? (
          <Button
            className="bp4-dark"
            active
            text="Start Sorting"
            onClick={() => setSorting(true)}
          />
        ) : (
          <Button
            className="bp4-dark"
            active
            text="Pause Sorting"
            onClick={() => setSorting(false)}
          />
        )}
        <Button
          className="bp4-dark"
          active
          text="Generate new array"
          onClick={handleGenerateNewArray}
        />

      </Card>
      <Card className={`bp4-dark ${classes.sort__controller__timer}`}>
          <Label className="bp4-inline" htmlFor="timer">Time between actions</Label>
          <Slider
            id="timer"
            min={10}
            max={300}
            stepSize={10}
            labelStepSize={100}
            labelRenderer={renderLabel}
            onChange={(value) => setTimer(value)}
            value={timer}
            showTrackFill={false}
          />
        </Card>
        <Card className={`bp4-dark ${classes.sort__controller__timer}`}>
          <Label className="bp4-inline" htmlFor="quantity">Number of elements</Label>
          <Slider
            id="quantity"
            min={10}
            max={200}
            stepSize={1}
            labelStepSize={100}
            onChange={(value) => onSetQuantity(value)}
            value={quantity}
            showTrackFill={false}
          />
        </Card>
      <Card className={`bp4-dark ${classes.sort__controller__sortinfo}`}>{selected}</Card>
    </div>
  );
};

export default SortController;
