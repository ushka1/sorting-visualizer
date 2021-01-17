import { Algorithm, QueueElement } from 'controllers/SortQueue';

export const insertionSort: Algorithm = (arr) => {
  const queue: QueueElement[] = [];

  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      const cur = arr[j];
      const prev = arr[j - 1];

      queue.push({
        arr: [...arr],
        compare: [j, j - 1],
      });

      if (cur < prev) {
        queue.push({
          arr: [...arr],
          swap: [j, j - 1],
        });

        arr[j - 1] = cur;
        arr[j] = prev;

        queue.push({
          arr: [...arr],
          swap: [j, j - 1],
        });
      }

      if (cur >= prev) {
        break;
      }
    }
  }

  return queue;
};
