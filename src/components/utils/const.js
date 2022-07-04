export const STANDARD_COLOR = "#184A90"
export const RED_COLOR = "#8E292C"
export const ALGORITHMS = {
    BubbleSort: 'Bubble sort',
    MergeSort: 'Merge sort',
    QuickSort: 'Quick sort',
    SelectionSort: 'Selection sort',
  };
export const ALGORITHMS_INFO = new Map([
  [ALGORITHMS.BubbleSort, {'Average Complexity': 'O(n2)', 'Best Case': 'O(n)', 'Worst Case': 'O(n2)', 'Space Complexity': 'O(1)', }],
  [ALGORITHMS.MergeSort, {'Average Complexity': 'O(n x log n)', 'Best Case': 'O(n x log n)', 'Worst Case': 'O(n x log n)', 'Space Complexity': 'O(n)', }],
  [ALGORITHMS.QuickSort, {'Average Complexity': 'O(n x log n)', 'Best Case': 'O(n x log n)', 'Worst Case': 'O(n2)', 'Space Complexity': 'O(n)', }],
  [ALGORITHMS.SelectionSort, {'Average Complexity': 'O(n2)', 'Best Case': 'O(n2)', 'Worst Case': 'O(n2)', 'Space Complexity': 'O(1)', }],
])