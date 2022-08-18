function sequence(key) {
  if (!sequence.sequenceMap[key]) {
    sequence.sequenceMap[key] = {
      callbackList: [],
      current: null,
      executor: null,
      waiting2Executed: []
    }
  }
  function fn(callback) {
    if (!sequence.sequenceMap[key]) {
      throw Error('Whether the sequence(key) has not been called?')
    }
    const index = sequence.sequenceMap[key].callbackList.length;
    const callbackList = sequence.sequenceMap[key].callbackList;
    callbackList.push(callback);
    function* gn() {
      yield -1;
      for (let index = 0; index < callbackList.length; index++) {
        callbackList[index]();
        yield index;
      }
    }
    sequence.sequenceMap[key].executor = gn();
    sequence.sequenceMap[key].current = sequence.sequenceMap[key].executor.next();
    function executed() {
      if (sequence.sequenceMap[key].current.done) {
        return;
      }
      sequence.sequenceMap[key].current = sequence.sequenceMap[key].executor.next();
    }
    return function () {
      if (!sequence.sequenceMap[key].current || !sequence.sequenceMap[key].executor) {
        return;
      }
      if (sequence.sequenceMap[key].current.value === index - 1) {
        executed();
      } else {
        sequence.sequenceMap[key].waiting2Executed.push(index);
      }
      sequence.sequenceMap[key].waiting2Executed.sort((a, b) => a - b);// 排序 从小到大
      sequence.sequenceMap[key].waiting2Executed.forEach(i => {
        if (!sequence.sequenceMap[key].current || !sequence.sequenceMap[key].executor) {
          return;
        }
        if (sequence.sequenceMap[key].current.value === i - 1) {
          executed();
        }
      });
      sequence.sequenceMap[key].waiting2Executed = sequence.sequenceMap[key].waiting2Executed.filter(i => i > sequence.sequenceMap[key].current.value);
    }
  }
  // 清除
  fn.clear = function () {
    sequence.sequenceMap[key] = {
      callbackList: [],
      current: null,
      executor: null,
      waiting2Executed: []
    }
  }
  return fn;
}

sequence.sequenceMap = {};

// module.exports = sequence;
export default sequence;