(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["sequence-async"] = factory());
})(this, (function () { 'use strict';

  function sequence(key) {
    function fn(callback) {
      if (!Array.isArray(sequence.sequenceMap[key])) {
        sequence.sequenceMap[key] = [];
      }
      sequence.sequenceMap[key].push({
        callback,
        status: "pending", // pending | ready | done
      });
      const index = sequence.sequenceMap[key].length - 1;
      return () => {
        if (!sequence.sequenceMap[key][index]) {
          return;
        }
        sequence.sequenceMap[key][index].status = "ready";
        let firstReadyIndex = sequence.sequenceMap[key].findIndex(
          (item) => item.status === "ready"
        );
        let firstPendingIndex = sequence.sequenceMap[key].findIndex(
          (item) => item.status === "pending"
        );
        if (
          firstPendingIndex !== -1 &&
          firstPendingIndex < firstReadyIndex
        ) {
          return;
        }
        let end =
          firstPendingIndex === -1 ? sequence.sequenceMap[key].length - 1 : firstPendingIndex;
        for (let i = firstReadyIndex; i <= end; i++) {
          if (sequence.sequenceMap[key][i] && sequence.sequenceMap[key][i].status === "ready") {
            sequence.sequenceMap[key][i].status = "done";
            sequence.sequenceMap[key][i].callback();
          }
        }
      };
    }
    fn.clear = function () {
      sequence.sequenceMap[key] = [];
    };
    return fn;
  }
  sequence.sequenceMap = {};

  return sequence;

}));
