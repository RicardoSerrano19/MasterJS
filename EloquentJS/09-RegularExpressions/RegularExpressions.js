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

/* 📃 Repeating parts of a pattern
  # 
*/

console.log(/'\d+'/.test("'123'")); // → true
console.log(/'\d+'/.test("''")); // → false
// 🧩 + → Indicates that element may be repeated more than once

console.log(/'\d*'/.test("'123'")); // → true
console.log(/'\d*'/.test("''")); // → true
// 🧩 * → Indicates that element may be repeated zero, one or more than once

let neighbor = /neighbou?r/;
console.log(neighbor.test('neighbour')); // → true
console.log(neighbor.test('neighbor')); // → true
// 🧩 ? → Indicates that element optional, always return true;

let dateTimeRefactor = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTimeRefactor.test('1-30-2021 8:23')); // → true
// 🧩 {n} → Requires it to occur 'n' times
// 🧩 {n, m} → Specify a range occur at least 'n' and at most 'm' times
// 🧩 {n, } → Requires it to ocurr 'n' or more times

/* 📃 Matches and groups
  # Exec (execute) method that will return null if
no match was found and return an object with information about the
match otherwise
*/

let match = /\d+/.exec('one two 100');
console.log(match); // → [ '100', index: 8, input: 'one two 100', groups: undefined ]
console.log(match.index); // → 8

console.log('one two 100'.match(/\d+/)); // → String method match expect RegExp and behaves similarly

let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'")); // → [ "'hello'", 'hello', index: 9, input: "she said 'hello'", groups: undefined ]
// 🧩 () → Parenthesis is used to group

console.log(/bad(ly)?/.exec('bad')); // → ["bad", undefined]
console.log(/(\d)+/.exec('123')); // → ["123", "3"]

/* 📃 The Date Class
  # Date is a standard class for representing dates—or, rather, points
in time.
*/

console.log(new Date()); // → Today
console.log(new Date(2009, 11, 9)); // → Wed Dec 09 2009 00:00:00 GMT+0100 (CET)
// → {year, month{0-11}, day, hours, minutes, seconds, miliseconds}

console.log(new Date(1997, 05, 19).getTime());  // → 866696400000
console.log(new Date(866696400000)); // → Thu Jun 19 1997 00:00:00 GMT-0500 (GMT-05:00)

function getDate(string) {
  let [completo, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{1,4})/.exec(string);
  return new Date(year, month - 1, day);
}

console.log(getDate("1-30-2003"));// → Date Thu Jan 30 2003 00:00:00 GMT-0600 (GMT-06:00)

/* 📃 Word and string boundaries
  # 
*/
console.log(/cat/.test("concatenate")); // → true
console.log(/\bcat\b/.test("cconcatenatet")); // → false

// 🧩 \b → Start and end on a word boundary
// 🧩 ^ → Matches the beggining of the String or line
// 🧩 $ → Matches the end of the String or line

/* 📃 Choice patterns
  # 
*/

let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test("15 pigs")); // → true
console.log(animalCount.test("15 pigchickens"));// → false

// 🧩 | → Acts like a boolean OR

/* 📃 The mechanics of matching
  # The engine treats a regular expression
something like a flow diagram
*/

let regExpression = /\b\d+ (pig|cow|chicken)s?\b/;
/*                   
                     / → "pig"     \   →  -  \
· → boundary → digit → "cow"       → / → "s" → boundary → ·
               \__/  \ → "chicken" /   →  -  /
*/
