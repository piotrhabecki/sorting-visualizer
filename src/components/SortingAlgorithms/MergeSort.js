import { STANDARD_COLOR, RED_COLOR } from "../utils/const";

export function* mergeSort(arr, i = 0, j = arr.length - 1) {
  const middle = Math.floor((j - i) / 2) + i;

  // Step 1,2,3
  yield {
    result: arr,
  };
  if (j <= i) return { result: arr };

  yield* mergeSort(arr, i, middle);
  yield* mergeSort(arr, middle + 1, j);
  yield* merge(arr, i, middle, j);

  return { result: arr };
}

export function* merge(arr, i, middle, j) {
  let left = i;
  let right = middle + 1;
  const sorted = [];

  // Helper function to simplify repeated yields
  function* push(index) {
    // Step 4
    yield {
      result: arr,
    };
    sorted.push(arr[index]);
  }

  while (left <= middle && right <= j) {
    if (arr[left].value <= arr[right].value) {
      arr[left].color = RED_COLOR;
      arr[right].color = RED_COLOR;
      yield {
        result: arr,
      };

      arr[left].color = STANDARD_COLOR;
      arr[right].color = STANDARD_COLOR;

      yield* push(left);
      left++;

      yield {
        result: arr,
      };
    } else {
      arr[left].color = RED_COLOR;
      arr[right].color = RED_COLOR;
      yield {
        result: arr,
      };

      arr[left].color = STANDARD_COLOR;
      arr[right].color = STANDARD_COLOR;

      yield* push(right);
      right++;

      yield {
        result: arr,
      };
    }
  }
  while (left <= middle) {
    arr[left].color = RED_COLOR;
    arr[middle].color = RED_COLOR;
    yield {
      result: arr,
    };

    arr[left].color = STANDARD_COLOR;
    arr[middle].color = STANDARD_COLOR;
    yield* push(left);
    left++;
  }
  while (right <= j) {
    arr[right].color = RED_COLOR;
    arr[j].color = RED_COLOR;
    yield {
      result: arr,
    };

    arr[right].color = STANDARD_COLOR;
    arr[j].color = STANDARD_COLOR;
    yield* push(right);
    right++;
  }

  for (let k = 0; k < sorted.length; k++) {
    // Step 5
    yield {
      result: arr,
    };
    arr[i + k] = sorted[k];
  }
  return { result: arr };
}
