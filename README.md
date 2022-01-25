# sequence

JavaScript invokes asynchronous tasks sequentially and waits for the previous task to execute before continuing to execute the next task.

JavaScript 顺序调用异步任务，需等待上一个任务执行后，才会继续执行下一个任务。

## Installation

> npm install sequence-async

## Usage

```javascript
import { sequence } from "sequence-async";

const imgs = ["img_url_1", "img_url_2", "img_url_3"];

imgs.forEach((item, index) => {
  const img = new Image();
  img.style.width = "100px";
  img.style.height = "100px";
  img.onload = sequence("key")(() => {
    console.log(index);
    document.body.appendChild(img);
  });
  img.src = item;
});

// 0
// 1
// 2
```

## API

```TypeScript
sequence(key: string | Symbol)(callback: () => void): () => void;
```
