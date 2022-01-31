const { walk } = require(".");

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
