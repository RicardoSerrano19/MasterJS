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
