const queue = [];
const sequence = (callback, index) => {
  queue.push({
    callback,
    index,
    status: "pending", // pending | ready | done
  });
  return () => {
    queue[index].status = "ready";
    let firstReadyIndex = queue.findIndex(
      (item) => item.status === "ready"
    );
    let firstPendingIndex = queue.findIndex(
      (item) => item.status === "pending"
    );
    if (firstPendingIndex !== -1 && firstPendingIndex < firstReadyIndex) {
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

export default sequence;