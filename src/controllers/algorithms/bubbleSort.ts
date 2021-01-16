import { Algorithm, QueueElement } from 'controllers/SortQueue';

export const bubbleSort: Algorithm = (arr) => {
  const queue: QueueElement[] = [];

  for (let i = arr.length - 1; i > 0; i--) {
    let swapped = false;

    for (let j = 0; j < i; j++) {
      const left = arr[j];
      const right = arr[j + 1];

      queue.push({
        arr: [...arr],
        active: [j, j + 1],
      });

      if (left > right) {
        arr[j] = right;
        arr[j + 1] = left;
        swapped = true;

        queue.push({
          arr: [...arr],
          active: [j, j + 1],
        });
      }
    }

    if (!swapped) break;
  }

  return queue;
};
