import { bubbleSort } from "../SortingAlgorithms/BubbleSort";
import { mergeSort } from "../SortingAlgorithms/MergeSort";
import { useState } from "react";
import { randomArray } from "../utils/RandomArray";
import Bar from "../Bar/Bar";

import classes from "./SortingVisualizer.module.css";

const SortingVisualizer = () => {
  const initialArray = [
    { value: 80, index: 0, key: 0, color: "#d3c0ff" },
    { value: 20, index: 1, key: 1, color: "#d3c0ff" },
    { value: 10, index: 2, key: 2, color: "#d3c0ff" },
    { value: 90, index: 3, key: 3, color: "#d3c0ff" },
    { value: 50, index: 4, key: 4, color: "#d3c0ff" },
    { value: 50, index: 5, key: 5, color: "#d3c0ff" },
    { value: 50, index: 6, key: 6, color: "#d3c0ff" },
  ];

  const [array, setArray] = useState(initialArray);

  const [generator, setGenerator] = useState(bubbleSort(array));
  const [sortingState, setSortingState] = useState(() => generator.next());
  const [sortingStarted, setSortingStarted] = useState(false);
  const [result, setResult] = useState(sortingState.value.result);

  const step = () => {
    setSortingStarted(true)
    if (!sortingState.done) {
      setSortingState(generator.next());
      return;
    }
    if (result) {
      setArray(result);
      setResult(result)
      setSortingStarted(false)
      return;
    }
  };

  const BubbleSortStep = () => {
    setGenerator(bubbleSort(array));
  };

  const MergeSortStep = () => {
    setGenerator(mergeSort(array));
  };

  const handleGenerateNewArray = () => {
    const tempArray = randomArray(10, 5, 500);
    const newGenerator = mergeSort(tempArray);
    setGenerator(newGenerator);
    setSortingState(newGenerator.next());

    setArray(tempArray);
    setResult(tempArray);
    console.log(array);
  };

  return (
    <div>
      <button onClick={step}>Next step</button>
      <div>{JSON.stringify(sortingState, null, 2)}</div>
      <div className={classes.sorting__app}>
        <div id="array_container" className={classes.array__container}>
          {result && sortingStarted
            ? result.map((bar, index) => {
                return (
                  <Bar
                    height={bar.value}
                    index={bar.index}
                    key={index}
                    color={bar.color}
                  />
                );
              })
            : array.map((bar, index) => {
                return (
                  <Bar
                    height={bar.value}
                    index={bar.index}
                    key={index}
                    color={bar.color}
                  />
                );
              })}
        </div>
        <div className={classes.controler__container}>
          <button
            className={classes.array__button}
            onClick={handleGenerateNewArray}
          >
            Generate new array
          </button>
          <button className={classes.array__button} onClick={MergeSortStep}>
            Merge Sort
          </button>
          <button className={classes.array__button} onClick={BubbleSortStep}>
            Bubble Sort
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
