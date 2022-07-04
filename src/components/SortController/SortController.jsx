import { Card, Button, Slider, Label } from "@blueprintjs/core";
import { ALGORITHMS, ALGORITHMS_INFO } from "../utils/const";

import useGetMaxElements from "../Hooks/UseGetMaxElements";

import classes from "./SortController.module.css";

const SortController = ({
  selectAlgo,
  sorting,
  setSorting,
  handleGenerateNewArray,
  selected,
  timer,
  setTimer,
  onSetQuantity,
  quantity,
}) => {
  const renderLabel = (val) => {
    return `${val}ms`;
  };

  return (
    <div className={classes.sort__controller__container}>
      <Card className={`bp4-dark ${classes.sort__controller__controllers}`}>
        <select
          name="algorithms"
          id="algo"
          onChange={(event) => {
            selectAlgo(event.target.value);
          }}
        >
          <option value={ALGORITHMS.BubbleSort}>{ALGORITHMS.BubbleSort}</option>
          <option value={ALGORITHMS.MergeSort}>{ALGORITHMS.MergeSort}</option>
          <option value={ALGORITHMS.QuickSort}>{ALGORITHMS.QuickSort}</option>
          <option value={ALGORITHMS.SelectionSort}>
            {ALGORITHMS.SelectionSort}
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
        <Label className="bp4-inline" htmlFor="timer">
          Time between actions
        </Label>
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
        <Label className="bp4-inline" htmlFor="quantity">
          Number of elements
        </Label>
        <Slider
          id="quantity"
          min={10}
          max={useGetMaxElements()}
          stepSize={1}
          labelStepSize={100}
          onChange={(value) => onSetQuantity(value)}
          value={quantity}
          showTrackFill={false}
        />
      </Card>
      <Card className={`bp4-dark ${classes.sort__controller__sortinfo}`}>
        <table class="bp4-html-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Average Case</th>
              <th>Best Case</th>
              <th>Worst Case</th>
              <th>Space</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{selected}</td>
              <td>{ALGORITHMS_INFO.get(selected)["Average Complexity"]}</td>
              <td>{ALGORITHMS_INFO.get(selected)["Best Case"]}</td>
              <td>{ALGORITHMS_INFO.get(selected)["Worst Case"]}</td>
              <td>{ALGORITHMS_INFO.get(selected)["Space Complexity"]}</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default SortController;
