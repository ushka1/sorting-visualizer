import { Algorithm, QueueElement } from 'controllers/SortQueue';

export const insertionSort: Algorithm = (arr) => {
  const queue: QueueElement[] = [];

  for (let i = 1; i < arr.length; i++) {
    const cur = arr[i];
    let idx = i - 1;

    while (idx > -1 && cur < arr[idx]) {
      queue.push({
        arr: [...arr],
        active: [idx + 1, idx],
      });

      arr[idx + 1] = arr[idx];
      idx--;
    }

    queue.push({
      arr: [...arr],
      active: [idx + 1, idx],
    });

    arr[idx + 1] = cur;

    queue.push({
      arr: [...arr],
      active: [idx + 1, idx],
    });
  }

  return queue;
};
