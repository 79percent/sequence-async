# sequence-async

JavaScript invokes asynchronous tasks sequentially and waits for the previous task to execute before continuing to execute the next task.

JavaScript 顺序调用异步任务，需等待上一个任务执行后，才会继续执行下一个任务。

## Installation

```bash
npm i sequence-async
```

## Usage

```javascript
const sequence = require("sequence-async");

const testSeq = sequence("test");

const a = testSeq(() => {
  console.log("a");
});
const b = testSeq(() => {
  console.log("b");
});
const c = testSeq(() => {
  console.log("c");
});

setTimeout(a, 1500);
setTimeout(b, 1000);
setTimeout(c, 500);

// 虽然定时器的执行顺序应该是 c > b > a，但是输出结果是
// a
// b
// c
```

## API

- sequence

```TypeScript
sequence(key: string | Symbol)(callback: () => void): () => void;
```

- .clear

```TypeScript
const testSeq = sequence("test");

testSeq.clear();
```
