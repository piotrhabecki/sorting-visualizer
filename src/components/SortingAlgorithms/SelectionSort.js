import { RED_COLOR, STANDARD_COLOR } from "../utils/const";

export function* selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j].value < arr[minIndex].value) {
        arr[j].color = RED_COLOR;
        arr[minIndex].color = RED_COLOR;
        yield {
          result: arr,
        };
        arr[j].color = STANDARD_COLOR;
        arr[minIndex].color = STANDARD_COLOR;
        yield {
          result: arr,
        };

        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return { result: arr };
}
