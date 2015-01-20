var reduce = function(collection, iterator, accumulator) {
  if (accumulator === undefined) {
    accumulator = collection[0];
    collection.shift();
  }

  each(collection, function(collection[i], i, collection) {
    accumulator = iterator(accumulator, collection[i], i, collection);
  });

  return accumulator;
};