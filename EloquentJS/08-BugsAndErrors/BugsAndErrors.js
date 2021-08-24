/* 📃 Strict mode
  # 
    - Elimina algunos errores silenciosos de JavaScript cambiándolos para que lancen errores.
    - Corrige errores que hacen difícil para los motores de JavaScript realizar optimizaciones: a veces, el código en modo estricto puede correr más rápido que un código idéntico pero no estricto.
*/
function canYouSpotTheProblem() {
  'use strict';
  for (counter = 0; counter < 10; counter++) {
    console.log('Happy happy');
  }
}
//canYouSpotTheProblem();
// → ReferenceError: counter is not defined

function Person(name) {
  this.name = name;
}
let ferdinand = Person('Ferdinand'); // oops
//console.log(name);
// → Ferdinand

('use strict');

// (String) → (Person2)
function Person2(name) {
  this.name = name;
}
let ferdinand2 = Person2('Ferdinand'); // forgot new
//console.log(ferdinand2);
// → TypeError: Cannot set property 'name' of undefined

/* 📃 Types
  # There are several JavaScript dialects that add types to the lan-
guage and check them. The most popular one is called TypeScript. If
you are interested in adding more rigor to your programs, I recommend
you give it a try
*/

/* 📃 Testing
  # Automated testing is the process of writing a program that
tests another program
*/

function test(label, body) {
  if (!body()) console.log(`Failed: ${label}`);
}

test('convert Latin text to uppercase', () => {
  return 'hello'.toUpperCase() == 'HELLO';
});
// → true
test('convert Greek text to uppercase', () => {
  return 'Χαίρετε'.toUpperCase() == 'ΧΑΊΡΕΤΕ';
});
// → true
test('convert Latin text (myname) to uppercase', () => {
  return 'myname'.toUpperCase() == 'myname';
});
// →'Failed: convert Latin text (myname) to uppercase'

/* 📃 Debugging
  # The process of finding mistakes -bugs- in programs is called debuging
  - Putting a console.log in strategic place is good way to get a adittional informacion
  - Use a browser debugger
*/
function numberToString(n, base = 10) {
  let result = '',
    sign = '';
  if (n < 0) {
    sign = '-';
    n = -n;
  }
  do {
    result = String(n % base) + result;
    n = Math.floor(n / base);
  } while (n > 0);
  return sign + result;
}

console.log(numberToString(13, 2));

/* 📃 Error propagation
  # 
*/
function promptNumber(question) {
  let result = Number(prompt(question));
  if (Number.isNaN(result)) return null;
  else return result;
}
//console.log(promptNumber('How many trees do you see?'));

// -> The caller should be explicity take error returning a special value to indicate the error.

function lastElement(array) {
  if (array.length == 0) {
    return { success: false };
  } else {
    return { element: array[array.length - 1], success: true };
  }
}

console.log(lastElement([])); // -> { success: false }
console.log(lastElement([1, 2, 3])); // -> { element: 3, success: true }

/* 📃 Exceptions
  # When a function cannot proceed normally, what we would like to do
is just stop what we are doing and immediately jump to a place that
knows how to handle the problem
*/

function convertDirection(direction) {
  if (direction.toLowerCase() == 'left') return 'L';
  if (direction.toLowerCase() == 'right') return 'R';
  throw new Error('Invalid direction: ' + direction);
}
console.log(convertDirection('Right')); // → R
console.log(convertDirection('LEft')); // → L
//console.log(convertDirection('NoDirection')); // → Error: Invalid direction: NoDirection

function look(direction) {
  if (convertDirection(direction) == 'L') {
    return 'A house';
  } else {
    return 'two angry bears';
  }
}

try {
  console.log('You see: ' + look('Left')); // → 'You see: A house'
} catch (error) {
  console.log('Something went wrong: ' + error);
}

/*try {
  console.log('You see: ' + look('Up'));
} catch (error) {
  console.log('Something went wrong: ' + error); // → 'Something went wrong: Error: Invalid direction: Up'
}*/

/* 📃 Cleaning up after exceptions
  # Using Try, catch, finally
*/

const accounts = {
  a: 100,
  b: 0,
  c: 20,
};

function getAccount(accountName) {
  if (!accounts.hasOwnProperty(accountName)) {
    throw new Error(`No such account: ${accountName}`);
  }
  return accountName;
}

function transfer(from, to, amount) {
  if (accounts[from] < amount) return;
  accounts[from] -= amount;
  accounts[getAccount(to)] += amount;
}

// → Happy path
console.log(accounts); // → { a: 100, b: 0, c: 20 }
transfer('a', 'b', 5);
console.log(accounts); // → { a: 95, b: 5, c: 20 }

// → Wrong
console.log(accounts); // → { a: 100, b: 0, c: 20 }
//transfer('a', 'd', 5); // → Error: No such account: d
console.log(accounts); // → { a: 95, b: 0, c: 20 } - Makes money dissapear

function transferRefactor(from, to, amount) {
  if (accounts[from] < amount) return;
  let progress = 0;
  try {
    accounts[from] -= amount;
    progress = 1;
    accounts[getAccount(to)] += amount;
    progress = 2;
  } finally {
    if (progress == 1) {
      accounts[from] += amount;
    }
  }
}

console.log(accounts); // → { a: 100, b: 0, c: 20 }
// transferRefactor('a', 'd', 10); → Error: No such account: d - Finally executes returning the amount to from account
console.log(accounts); // → { a: 100, b: 0, c: 20 }

/* 📃 Selective catching
  # Using specific class to identify the error
*/
class InputError extends Error {}
function convertDirection(direction) {
  if (direction.toLowerCase() == 'left') return 'L';
  if (direction.toLowerCase() == 'right') return 'R';
  throw new InputError('Invalid direction: ' + direction);
}

try {
let dir = convertDirection('L'); // ← typo!
  console.log('You chose ', dir);
} catch (e) {
if (e instanceof InputError) {
console.log("Not a valid direction. Try again.");
} else {
throw e;
}
}

/* 📃 Assertions
  # Assertions are checks inside a program that verify that something is the
way it is supposed to be. hey are used not to handle situations that
can come up in normal operation but to find programmer mistakes
*/
function firstElement(array) {
if (array.length == 0) {
throw new Error("firstElement called with []");
}
return array[0];
}

console.log(firstElement([1,2,3])) // → 1
console.log(firstElement([])) // → Error: firstElement called with []
