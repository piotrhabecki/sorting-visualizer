export function* bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j].value > arr[j + 1].value) {
        arr[j].color = "#FF7F50";
        arr[j + 1].color = "#FF7F50";
        yield {
          result: arr,
        };
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        arr[j].color = "#d3c0ff";
        arr[j + 1].color = "#d3c0ff";
        yield {
          result: arr,
        };
      } 
    }
  }
  return arr;
}
