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
  # 
*/
function numberToString(n, base = 10) {
let result = "", sign = "";
if (n < 0) {
sign = "-";
n = -n;
}
do {
result = String(n % base) + result;
n /= base;
211} while (n > 0);
return sign + result;
}