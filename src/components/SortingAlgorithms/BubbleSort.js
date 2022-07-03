import { STANDARD_COLOR, RED_COLOR } from "../utils/const";

export function* bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j].value > arr[j + 1].value) {
        arr[j].color = RED_COLOR;
        arr[j + 1].color = RED_COLOR;
        yield {
          result: arr,
        };
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        arr[j].color = STANDARD_COLOR;
        arr[j + 1].color = STANDARD_COLOR;
        yield {
          result: arr,
        };
      } 
    }
  }
  return arr;
}
