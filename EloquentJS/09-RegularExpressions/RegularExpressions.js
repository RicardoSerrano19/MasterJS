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
// 🧩 . Any character except line breaks

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

/* 📃 Backtracking
  # Search engine search for match from the top branch to the bottom. If it find a match branch it doesnt look the rest of the branch.
*/

/* → The matcher stops as soon as it finds a full match. This means that if multiple branches could potentially match a string, only the first one
(ordered by where the branches appear in the regular expression) is
used.
*/

/* 📃 Replace method
  # String values have a replace method that can be used to replace part
of the string with another string. Can be a String or a RegExp, but if is string only the first ocurrence will be replaced.
*/

console.log("papa".replace("p", "m")); // → mapa (Only the first coincidence)

console.log("papa".replace(/[p]/, "m")); // → mapa (Only the first coincidence)
console.log("papa".replace(/[p]/g, "m")); // → mama (Using flag "g" all the coincidences)

// 🧩 g → Global is used to match all matches
console.log("Liskov, Barbara\nMcCarthy, John\nWadler, Philip");
/* → Format {Lastname, Firstname}
'Liskov, Barbara
McCarthy, John
Wadler, Philip'*/

console.log(
"Liskov, Barbara\nMcCarthy, John\nWadler, Philip"
.replace(/(\w+), (\w+)/g, "$2 $1"));
/* → Format {Firstname Lastname}
'Barbara Liskov
John McCarthy
Philip Wadler'*/

let s = "the cia and fbi";
console.log(s.replace(/\b(fbi|cia)\b/g, str => str.toUpperCase()));
// → the CIA and FBI

let stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) { // only one left, remove the 's'
    unit = unit.slice(0, unit.length - 1);
  } else if (amount == 0) {
    amount = "no";
  }
  return amount + " " + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne)); // → no lemon, 1 cabbage, and 100 eggs'
// (\d+) for amount
// (\w+) for unit

/* 📃 Greed
  # 
*/

function stripComments(code) {
return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
console.log(stripComments("1 + /* 2 */3"));
// → 1 + 3
console.log(stripComments("x = 10;// ten!"));
// → x = 10;
console.log(stripComments("1 /* a */+/* b */ 1"));
// → 1 1

/* 📃 Dynamically creating RegExp objects
  # 
*/

let name = "harry";
let text = "Harry is a suspicious character.";
let regexp = new RegExp("\\b(" + name + ")\\b", "gi");
console.log(text.replace(regexp, "_$1_"));
// → _Harry_ is a suspicious character.

let name2 = "dea+hl[]rd";
let text2 = "This dea+hl[]rd guy is super annoying.";
let escaped = name2.replace(/[\\[.+*?(){|^$]/g, "\\$&");
let regexp2 = new RegExp("\\b" + escaped + "\\b", "gi");
console.log(text2.replace(regexp2, "_$&_"));
// → This _dea+hl[]rd_ guy is super annoying

/* 📃 The search method
  # The indexOf method on strings cannot be called with a regular expres-
sion. But there is another method, search , that does expect a regular
expression. Like indexOf , it returns the first index on which the expres-
sion was found, or -1 when it wasn’t found.
*/

console.log("  word".search(/\S/)); // → 2
console.log("  ".search(/\S/)); // → -1

/* 📃 LastIndex Property
  # 
*/
let patternLastIndex = /y/g;
console.log(patternLastIndex.lastIndex); // → 0
patternLastIndex.lastIndex = 3;
let matchLastIndex = patternLastIndex.exec("xyzzy");
console.log(matchLastIndex.index); // → 4
console.log(patternLastIndex.lastIndex); // → 5

let global = /abc/g;
console.log(global.exec("xyz abc")); // → ["abc"]
let sticky = /abc/y;
console.log(sticky.exec("xyz abc")); // → null

let digit = /\d/g;
console.log(digit.exec("here it is: 1")); // → ["1"]
console.log(digit.exec("and now: 1")); // → null (return null because exec automatic update last index and doesnt find nothing after that index.)

console.log("Banana".match(/an/g)); // → ["an", "an"]

/* 📃 Looping over matches
  # A common thing to do is to scan through all occurrences of a pattern
in a string, in a way that gives us access to the match object in the loop
body
*/

let inputLoop = "A string with 3 numbers in it... 42 and 88.";
let numberLoop = /\b\d+\b/g;
let matchLoop;
while(matchLoop = numberLoop.exec(inputLoop)){
  const number = matchLoop[0];
  const index = matchLoop.index;
  console.log(`Found ${number} at ${index}`);
}

// → Found 3 at 14
// Found 42 at 33
// Found 88 at 40x

/* 📃 Parsing an INI file
  # Convert a string  into an object whose properties hold strings for settings written before the first section header and subobjects for sections, with those subobjects holding the section’s settings
*/

const information = `searchengine=https://duckduckgo.com/?q=$1
spitefulness=9.7

; los comentarios estan precedidos por un punto y coma...
; cada seccion contiene un enemigo individual

[larry]
fullname=Larry Doe
type=bravucon del preescolar
website=http://www.geocities.com/CapeCanaveral/11451

[davaeorn]
fullname=Davaeorn
type=hechizero malvado
outpudir=/home/marijn/enemies/davaeorn`;

function parseINI(string) {
  // Start with an object to hold the top-level fields
  let result = {};
  let section = result;
  string.split(/\r?\n/).forEach(line=>{
    let match;
    if (match = line.match(/^(\w+)=(.*)$/)) {
      section[match[1]] = match[2];
    } else if (match = line.match(/^\[(.*)\]$/)) {
      section = result[match[1]] = {};
    } else if (!/^\s*(;.*)?$/.test(line)) {
      throw new Error("Line '" + line + "' is not valid.");
    }
  });
  return result;
}
console.log(parseINI(information));
/* -> {
  searchengine: 'https://duckduckgo.com/?q=$1',
  spitefulness: '9.7',
  larry: {
    fullname: 'Larry Doe',
    type: 'bravucon del preescolar',
    website: 'http://www.geocities.com/CapeCanaveral/11451'
  },
  davaeorn: {
    fullname: 'Davaeorn',
    type: 'hechizero malvado',
    outpudir: '/home/marijn/enemies/davaeorn'
  }
} */

/* 📃 International characters
  # 
*/

console.log(/🍎{3}/.test("🍎🍎🍎"));
// → false
console.log(/<.>/.test("<🌹>"));
// → false
console.log(/<.>/u.test("<🌹>"));
// → true

// 🧩 u → Flag indicates unicode character


console.log(/\p{Script=Greek}/u.test("α"));
// → true
console.log(/\p{Script=Arabic}/u.test("α"));
// → false
console.log(/\p{Alphabetic}/u.test("α"));
// → true
console.log(/\p{Alphabetic}/u.test("!"));
// → false