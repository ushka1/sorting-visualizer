import { Algorithm, QueueElement } from 'controllers/SortQueue';

export const mergeSort: Algorithm = (arr) => {
  const queue: QueueElement[] = [];
  let currentArr = [...arr];

  function inner(arr: number[], idx: number): number[] {
    if (arr.length <= 1) {
      return arr;
    }

    const newArr: number[] = [];
    const pivot = Math.floor(arr.length / 2);

    const left = inner(arr.slice(0, pivot), idx + 0);
    const right = inner(arr.slice(pivot), idx + pivot);

    let curIdx = idx;
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      const gi = idx + i;
      const gj = idx + pivot + j;

      if (left[i] < right[j]) {
        updateCurrentArray(idx, [...left, ...right], [gi, gj], []);

        newArr.push(left[i]);
        i++;
      } else if (left[i] >= right[j]) {
        updateCurrentArray(idx, [...left, ...right], [gi, gj], []);

        newArr.push(right[j]);
        j++;
      }
    }

    for (let x = 1; x <= newArr.length; x++) {
      updateCurrentArray(idx, newArr.slice(0, x), [], [curIdx]);
      curIdx++;
    }

    let rest: number[] | undefined;

    if (i < left.length) {
      rest = left.slice(i);
    } else if (j < right.length) {
      rest = right.slice(j);
    }

    rest?.forEach((num) => {
      newArr.push(num);

      updateCurrentArray(idx, [...newArr], [], [curIdx]);
      curIdx++;
    });

    return newArr;
  }

  function updateCurrentArray(
    idx: number,
    arr: number[],
    compare: number[],
    swap: number[],
  ) {
    currentArr = [...currentArr];
    currentArr.splice(idx, arr.length, ...arr);

    queue.push({
      arr: currentArr,
      compare,
      swap,
    });
  }

  inner(arr, 0);
  return queue;
};
