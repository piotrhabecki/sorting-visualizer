import { bubbleSort } from "../SortingAlgorithms/BubbleSort";
import { mergeSort } from "../SortingAlgorithms/MergeSort";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRafLoop } from "react-use";
import { randomArray } from "../utils/RandomArray";
import Bar from "../Bar/Bar";
import { Card } from "@blueprintjs/core";
import classes from "./SortingVisualizer.module.css";
import SortController from "../SortController/SortController";
import { ALGORITHMS } from "../utils/const";

const SortingVisualizer = () => {
  const [quantity, setQuantity] = useState(100);
  const [result, setResult] = useState(randomArray(quantity, 5, 500));
  const [timer, setTimer] = useState(30);
  const [generator, setGenerator] = useState(bubbleSort(result));
  const [selected, setSelected] = useState(ALGORITHMS.BubbleSort);
  const [sortingState, setSortingState] = useState(null);
  const [sorting, setSorting] = useState(false);



  const step = () => {
    if (sorting) {
      setSortingState(generator.next());
      return;
    }
    if (result) {
      setResult(result);
      setSorting(false);
      setSortingState(null)
      return;
    }
  };

  const lastCalled = useRef(0);
  const delta = useRef(30);

  const [loopStop, loopStart] = useRafLoop((time) => {
    if (time - lastCalled.current > delta.current) {
      step();
      lastCalled.current = time;
    }
    if (result && !sorting) {
      return;
    }
  });

  const onAlgoSelect = (name) => {
    switch (name) {
      case ALGORITHMS.BubbleSort:
        setBubbleSort();
        break;
      case ALGORITHMS.MergeSort:
        setMergeSort();
        break;
      default:
      // code block
    }
  };

  useEffect(() => {
    if (!sorting) {
      loopStop();
      return;
    }
    loopStart();
    if (sorting) {
      delta.current = timer;
    }
  }, [loopStop, loopStart, sorting, timer]);

  const setBubbleSort = () => {
    setSelected(ALGORITHMS.BubbleSort);
    setGenerator(bubbleSort(result));
  };

  const setMergeSort = () => {
    setSelected(ALGORITHMS.MergeSort);
    setGenerator(mergeSort(result));
  };

  const handleGenerateNewArray = () => {
    setResult(randomArray(quantity, 5, 500));
    setSorting(false);
    onAlgoSelect(selected);
  };

  const onSetQuantity = (value) => {
    setQuantity(value);
    setResult(randomArray(value, 5, 500));
    setSorting(false);
  };

  return (
    <div>
      {/* <button onClick={step}>Next step</button> */}
      <div className={classes.sorting__app}>
        <SortController
          selectAlgo={onAlgoSelect}
          handleGenerateNewArray={handleGenerateNewArray}
          setSorting={setSorting}
          sorting={sorting}
          selected={selected}
          timer={timer}
          setTimer={setTimer}
          quantity={quantity}
          onSetQuantity={onSetQuantity}
        />
        <div id="array_container" className={classes.array__container}>
          <Card className="bp4-dark" elevation={3}>
            {result.map((bar, index) => {
              return (
                <Bar
                  height={bar.value}
                  index={bar.index}
                  key={index}
                  color={bar.color}
                />
              );
            })}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
