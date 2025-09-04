export function splitAllNestedArrays(data) {
  const nested = {};

  // Collect all nested arrays
  data.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (!nested[key]) nested[key] = [];
        nested[key].push(value); // keep each array as-is (no flatten)
      }
    });
  });

  // Remove all array fields from the original objects
  const withoutNested = data.map((item) => {
    const copy = { ...item };
    Object.keys(copy).forEach((key) => {
      if (Array.isArray(copy[key])) {
        delete copy[key];
      }
    });
    return copy;
  });

  return { nested, withoutNested };
}
