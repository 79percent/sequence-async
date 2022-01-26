const { sequence } = require('sequence-async');

const a = sequence('test')(() => {
  console.log('a')
});
const b = sequence('test')(() => {
  console.log('b')
});
const c = sequence('test')(() => {
  console.log('c')
});

setTimeout(a, 2500);
setTimeout(b, 1500);
setTimeout(c, 500);
