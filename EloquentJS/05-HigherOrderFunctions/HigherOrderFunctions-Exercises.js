/* Flattening🏆 
#  Use the reduce method in combination with the concat method to “flat-
ten” an array of arrays into a single array that has all the elements of
the original arrays.
*/
let arrays = [[1, 2, 3], [4, 5], [6]];
arrays.reduce((a, b) => a.concat(b));

/* Your own loop🏆 
#  Write a higher-order function loop that provides something like a for
loop statement. It takes a value, a test function, an update function,
and a body function. Each iteration, it first runs the test function on
the current loop value and stops if that returns false. Then it calls the
body function, giving it the current value. Finally, it calls the update
function to create a new value and starts from the beginning.
When defining the function, you can use a regular loop to do the
actual looping..
*/
const ownLoop = (value, test, update, body) => {
  while (true) {
    //Test
    if (!test(value)) return false;
    //Body giving the current value
    body(value);
    //Update function to create new value
    value = update(value);
  }
};

// Refactoring 🔨
const loop = (value, test, update, body) => {
  for (let start = value; test(value); value = update(value)) {
    body(value);
  }
};
loop(
  3,
  (n) => n > 0,
  (n) => n - 1,
  console.log
);

/* Everything🏆 
#  Analogous to the some method, arrays also have an every method. This
one returns true when the given function returns true for every element
in the array. In a way, some is a version of the || operator that acts on
arrays, and every is like the && operator.
Implement every as a function that takes an array and a predicate
function as parameters. Write two versions, one using a loop and one
using the some method.
*/

const everything = (elements, predicate) => {
  for (let el of elements) {
    let result = predicate(el);
    if (!result) return false;
  }
  return true;
};

// Refactoring 🔨
const everythingWithSome = (elements, predicate) => {
  return !elements.some((element) => !predicate(element));
};

console.log(everything([1, 3, 5], (n) => n < 10));
console.log(everything([2, 4, 16], (n) => n < 10));
console.log(everything([], (n) => n < 10));

console.log(everythingWithSome([1, 3, 5], (n) => n < 10));
console.log(everythingWithSome([2, 4, 16], (n) => n < 10));
console.log(everythingWithSome([], (n) => n < 10));
