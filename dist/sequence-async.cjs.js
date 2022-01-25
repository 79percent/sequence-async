'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function sequence(key) {
  return (callback) => {
    if (!Array.isArray(sequence.sequenceMap[key])) {
      sequence.sequenceMap[key] = [];
    }
    sequence.sequenceMap[key].push({
      callback,
      status: "pending", // pending | ready | done
    });
    const queue = sequence.sequenceMap[key];
    const index = queue.length - 1;
    return () => {
      queue[index].status = "ready";
      let firstReadyIndex = queue.findIndex(
        (item) => item.status === "ready"
      );
      let firstPendingIndex = queue.findIndex(
        (item) => item.status === "pending"
      );
      if (
        firstPendingIndex !== -1 &&
        firstPendingIndex < firstReadyIndex
      ) {
        return;
      }
      let end =
        firstPendingIndex === -1 ? queue.length - 1 : firstPendingIndex;
      for (let i = firstReadyIndex; i <= end; i++) {
        if (queue[i].status === "ready") {
          queue[i].callback();
          queue[i].status = "done";
        }
      }
    };
  };
}
sequence.sequenceMap = {};

exports.sequence = sequence;
