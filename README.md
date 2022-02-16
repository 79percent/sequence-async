# sequence-async

JavaScript invokes asynchronous tasks sequentially and waits for the previous task to execute before continuing to execute the next task.

JavaScript 顺序调用异步任务，需等待上一个任务执行后，才会继续执行下一个任务。

## Installation

```bash
npm i sequence-async
```

## Usage

```javascript
import { sequence } from "sequence-async";
// or
// const { sequence } = require('sequence-async');

const imgs = ["img_url_1", "img_url_2", "img_url_3"];

const sequenceFn = sequence("key");

imgs.forEach((item, index) => {
  const img = new Image();
  img.style.width = "100px";
  img.style.height = "100px";
  img.onload = sequenceFn(() => {
    console.log(index);
    document.body.appendChild(img);
  });
  img.src = item;
});

// No matter the picture fits the load is complete, always output
// 无论图片何时加载完成，永远输出
// 0
// 1
// 2
```

## API

```TypeScript
sequence(key: string | Symbol)(callback: () => void): () => void;
```
