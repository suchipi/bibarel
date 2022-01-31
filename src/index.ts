import traverse from "@suchipi/traverse";
import set from "lodash/set";
import produce from "immer";

function walkNoMutate(
  input: any,
  mapper: (value: any, path: Array<string | number>) => any
): any {
  const result = produce(input, (draft) => {
    traverse(draft, (value, path) => {
      const newValue = mapper(value, path);
      if (value !== newValue) {
        set(draft, path, newValue);
      }
    });
  });

  return result as any;
}

function walkMutate(
  input: any,
  mapper: (value: any, path: Array<string | number>) => any
): any {
  traverse(input, (value, path) => {
    const newValue = mapper(value, path);
    if (value !== newValue) {
      set(input, path, newValue);
    }
  });

  return input;
}

export const walk = Object.assign(walkNoMutate, {
  mutate: walkMutate,
});
