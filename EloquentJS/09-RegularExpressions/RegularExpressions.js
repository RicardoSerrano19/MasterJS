/* 📃 Creating a Regular Expression
  # A regular expression is a type of object. It can be either constructed
with the RegExp constructor or written as a literal value by enclosing a
pattern in forward slash ( / ) characters.
*/

let re1 = new RegExp('abc');
let re2 = /abc/;
// re1 and re2 represent the same pattern:
// 🧩 abc → 'a' character followed by 'b' followed by a 'c'

/* 📃 Testing for matches
  # Regular expression objects have a number of methods. The simplest
one is test . If you pass it a string, it will return a Boolean telling you
whether the string contains a match of the pattern in the expression.
 - Regular expression can occurs anywhere in the string
*/

console.log(/abc/.test('dabcde')); // → true
console.log(/abc/.test('abxde')); // → false

/* 📃 Sets of characters
  # Regular expression objects have a number of methods. The simplest
one is test . If you pass it a string, it will return a Boolean telling you
whether the string contains a match of the pattern in the expression.
 - Regular expression can occurs anywhere in the string
*/

console.log(/[0123456789]/.test('in 1992')); // → true
// 🧩 [] → Match any of the characters inside brackets, dont matter the position
console.log(/[0-9]/.test('in 1992')); // → true
// 🧩 [min-max] → Match any of the characters in the range of characters
// 🧩 \d Any digit character
// 🧩 \w An alphanumeric character (“word character”)
// 🧩 \s Any whitespace character (space, tab, newline, and similar)
// 🧩 \D A character that is not a digit
// 🧩 \W A nonalphanumeric character
// 🧩 \S A nonwhitespace character
// 🧩 . A nonwhitespace character

let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/; // → Match a date and time like 19-06-1997 12:20
console.log(dateTime.test('01-30-2003 15:20')); // → true
console.log(dateTime.test('30-jan-2003 15:20')); // → false

let notBinary = /[^01]/;
console.log(notBinary.test('110010001000101000110')); // → false
console.log(notBinary.test('110010001000121000110')); // → true
// 🧩 [^] → Any character except the ones in the set