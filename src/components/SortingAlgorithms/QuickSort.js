import { RED_COLOR, STANDARD_COLOR } from "../utils/const";

function swap(items, leftIndex, rightIndex) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

export function* quickSort(arr, left = 0, right = arr.length - 1) {
  var index;
  if (arr.length > 1) {
    index = yield* partition(arr, left, right);
    if (left < index - 1) {
      yield* quickSort(arr, left, index - 1);
    }
    if (index < right) {
      yield* quickSort(arr, index, right);
    }
  }
  return { result: arr };
}

export function* partition(arr, left, right) {
  var pIndex = Math.floor((right + left) / 2);
  var pivot = arr[pIndex];
  var i = left;
  var j = right;

  while (i <= j) {
    while (arr[i].value < pivot.value) {
      arr[i].color = RED_COLOR;
      arr[pIndex].color = RED_COLOR;
      yield {
        result: arr,
      };
      arr[i].color = STANDARD_COLOR;
      arr[pIndex].color = STANDARD_COLOR;
      yield {
        result: arr,
      };

      i++;
    }
    while (arr[j].value > pivot.value) {
      arr[j].color = RED_COLOR;
      arr[pIndex].color = RED_COLOR;
      yield {
        result: arr,
      };
      arr[j].color = STANDARD_COLOR;
      arr[pIndex].color = STANDARD_COLOR;
      yield {
        result: arr,
      };

      j--;
    }
    if (i <= j) {
      swap(arr, i, j);
      i++;
      j--;
    }
  }
  return i;
}
