const sequence = require('../dist/sequence-async.cjs');

const testSeq = sequence('test');

const a = testSeq(() => {
  console.log('a')
});
const b = testSeq(() => {
  console.log('b')
  testSeq.clear();
});
const c = testSeq(() => {
  console.log('c')
});

setTimeout(a, 1500);
setTimeout(b, 1000);
setTimeout(c, 500);
