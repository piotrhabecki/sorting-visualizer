import { useState, useEffect, useRef } from "react";
import { useRafLoop } from "react-use";

import { bubbleSort } from "../SortingAlgorithms/BubbleSort";
import { mergeSort } from "../SortingAlgorithms/MergeSort";
import { quickSort } from "../SortingAlgorithms/QuickSort";
import { selectionSort } from "../SortingAlgorithms/SelectionSort";

import Bar from "../Bar/Bar";
import { Card } from "@blueprintjs/core";
import SortController from "../SortController/SortController";

import useGetMaxElements from "../Hooks/UseGetMaxElements";
import { randomArray } from "../utils/RandomArray";
import { ALGORITHMS } from "../utils/const";

import classes from "./SortingVisualizer.module.css";

const SortingVisualizer = () => {
  const [quantity, setQuantity] = useState(useGetMaxElements());
  const [result, setResult] = useState(randomArray(quantity, 5, 500));
  const [timer, setTimer] = useState(30);
  const [generator, setGenerator] = useState(bubbleSort(result));
  const [selected, setSelected] = useState(ALGORITHMS.BubbleSort);
  const [sortingState, setSortingState] = useState();
  const [sorting, setSorting] = useState(false);

  const lastCalled = useRef(0);
  const delta = useRef(30);

  const step = () => {
    if (!sortingState?.done) {
      setSortingState(generator.next());
      console.log(sortingState);
      return;
    }
    if (sortingState.done) {
      setResult(result);
      return;
    }
  };

  const [loopStop, loopStart] = useRafLoop((time) => {
    if (time - lastCalled.current > delta.current && !sortingState?.done) {
      step();
      lastCalled.current = time;
    }
    if (sortingState?.done === true) {
      setSorting(false);
      return;
    }
  });

  const onAlgoSelect = (name, array = result) => {
    switch (name) {
      case ALGORITHMS.BubbleSort:
        setBubbleSort(array);
        break;
      case ALGORITHMS.MergeSort:
        setMergeSort(array);
        break;
      case ALGORITHMS.QuickSort:
        setQuickSort(array);
        break;
      case ALGORITHMS.SelectionSort:
        setSelectionSort(array);
        break;
      default:
        break;
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

  const reset = (array) => {
    setResult(array);
    setSorting(false);
    onAlgoSelect(selected, array);
  };

  const setAlgorithm = (algorithmFuncion, algorithmDescription) => {
    const newGenerator = algorithmFuncion;
    setGenerator(newGenerator);
    setSortingState(null);
    setSelected(algorithmDescription);
  };

  const setBubbleSort = (array) =>
    setAlgorithm(bubbleSort(array), ALGORITHMS.BubbleSort);
  const setMergeSort = (array) =>
    setAlgorithm(mergeSort(array), ALGORITHMS.MergeSort);
  const setQuickSort = (array) =>
    setAlgorithm(quickSort(array), ALGORITHMS.QuickSort);
  const setSelectionSort = (array) =>
    setAlgorithm(selectionSort(array), ALGORITHMS.SelectionSort);

  const handleGenerateNewArray = () => reset(randomArray(quantity, 5, 500));

  const onSetQuantity = (value) => {
    setQuantity(value);
    reset(randomArray(value, 5, 500));
  };

  return (
    <div>
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
      <a href="https://testquest.vercel.app/" className={classes.about__page}>Test Quest</a>
    </div>
  );
};

export default SortingVisualizer;
