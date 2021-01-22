import { Algorithm, QueueElement } from 'controllers/SortQueue';

function swap(arr: number[], i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

export const quickSort: Algorithm = (arr) => {
  const queue: QueueElement[] = [];
  const currentArr = [...arr];

  function inner(arr: number[], start = 0, end = arr.length): number[] | void {
    if (end - start <= 1) return;

    const pivot = arr[start];
    let swapIdx = start;

    for (let i = start + 1; i < end; i++) {
      const cur = arr[i];

      queue.push({
        arr: [...arr],
        compare: [start, i],
      });

      if (cur < pivot) {
        swapIdx++;

        if (swapIdx !== i) {
          queue.push({
            arr: [...arr],
            swap: [swapIdx, i],
            compare: [start],
          });
          swap(arr, swapIdx, i);
          queue.push({
            arr: [...arr],
            swap: [swapIdx, i],
            compare: [start],
          });
        }
      }
    }

    queue.push({
      arr: [...arr],
      swap: [start, swapIdx],
    });
    swap(arr, start, swapIdx);
    queue.push({
      arr: [...arr],
      swap: [start, swapIdx],
    });

    // console.log(swapIdx - start);
    // console.log(end - (swapIdx + 1));

    // console.log(arr.slice(start, swapIdx));
    // console.log(arr.slice(swapIdx + 1, end));

    //end excluded, start included
    //pivot stays in place !
    inner(arr, start, swapIdx);
    inner(arr, swapIdx + 1, end);

    return arr;
  }

  inner(currentArr);
  return queue;
};
