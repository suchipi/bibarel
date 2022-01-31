# `bibarel`

Utility for transforming tree structures

`bibarel` provides a function, `walk`, that traverses over a tree structure depth-first and calls a provided callback for each value in the tree. That value in the tree is then replaced with the return value of that callback. Think of it like Array.prototype.map, but for any JSON-compatible structure.

`walk` leverages [`immer`](https://npm.im/immer) to avoid actually mutating the input tree structure. However, if you'd like to mutate the input directly, use `walk.mutate`.

## Usage

```ts
import { walk } from "bibarel";

const someTree = {
  hello: "world",
  someArray: [1, 2, { potatoes: true, food: "potatoes" }],
  someObject: {
    helloAgain: "hi",
  },
};

const result = walk(someTree, (value, path) => {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (Array.isArray(value)) {
    return value.concat(":)");
  } else {
    return value;
  }
});

console.log(result);
// Outputs:
//
// {
//   hello: 'WORLD',
//   someArray: [ 1, 2, { potatoes: true, food: 'POTATOES' }, ':)' ],
//   someObject: { helloAgain: 'HI' }
// }
```

## Tips

`bibarel` goes great with [`bidoof`](https://npm.im/bidoof)! You can use `bidoof` to define your mapper function, and `bibarel` to run it against some input.

## License

MIT
