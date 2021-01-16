import { Algorithm, QueueElement } from 'controllers/SortQueue';

export const selectionSort: Algorithm = (arr) => {
  const queue: QueueElement[] = [];

  for (let i = 0; i < arr.length; i++) {
    let min = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }

      queue.push({
        arr: [...arr],
        active: [i, j],
      });
    }

    if (min !== i) {
      queue.push({
        arr: [...arr],
        active: [i, min],
      });

      const stored = arr[i];
      arr[i] = arr[min];
      arr[min] = stored;

      queue.push({
        arr: [...arr],
        active: [i, min],
      });
    }
  }

  return queue;
};
