/* 📃 Modules
  # The ideal program has a crystal-clear structure. The way it works is easy to explain, and each part plays a well-defined role.

  Two issues if we don't use modules:
  - If everything can touch everything else, it is difficult to look a any given piece in isolation.
  - If you want to use any of the functionality from such program in another situation, rewriting it may be easier than trying to disentangle it from its context.

  Modules are an attempt to avoid these problems. A *module* is a piece of program that specifies wich other pieces it relies on and wich functionality it provides from other modules to use (its interface).

  By restricting the ways in wich modules interact with each other, the system becomes more like LEGO, where pieces interact through well-defined conectors, and less like mud, where everything mixes with everything.

  The relations between modules are called *dependencies*. When module needs a piece from another module, it is said to depend on that module.
*/

/* 📃 Packages
  # One of the advantages of building a program out of separate pieces, and being actually able to run those pieces on their own, is that you might be able to apply the same piece in different programs.

  A *package* is a chunk of code that can be distributed (copied and installed). It may contain one or more modules and has information about wich other packeges it, depends on.

  When a problem is found in a package or a new features is added, the package is updated. Now the programs that depend on it can upgrade to the new version.

  NPM (Node Packages Module), is a online service where one can download (and upload) packages and a program (bundle with Node.js) that helps you install and manage them. 

  Software is cheap to copy, so once someone has wirtten it, distributing it to other people is an efficient process.
*/

/* 📃 Improvised modules
  # This is the old way to create modules, but it is mostly obsolete now.
*/

const weekDay = function() {
  const names = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return {
    name(number) {
      return names[number];
    },
    number(name) {
      return names.indexOf(name);
    }
  };
}();

console.log(weekDay.name(weekDay.number("Sunday"))); // → Sunday

/* 📃 Evaluating data as code
  # There are several ways to take data (a string of code) and run it as part of the current program.
*/

//Using operator *eval*, wich will execute a string in the current scope.
const x = 1;
function evalAndReturnX(code) {
  eval(code);
  return x;
}
console.log(evalAndReturnX("var x = 2")); // → 2
console.log(x); // → 1

// Use the *Function* constructor. It takes two arguments: a string containing a comma-separated list of argument names and a a string containing the function body.

let plusOne = Function("n", "return n + 1");
console.log(plusOne(4)); // → 5

//This is precisely what we need for a module system. Wrap the module¿s code in a function an use that functions's scope as module scope


/* 📃 CommonJS
  # There are several ways to take data (a string of code) and run it as part of the current program.
  The main concept in CommonJS modules is a function called require. Whe you call this with the module name of a dependency, it makes sure the module is loaded and returns its interface.
*/

// ----------------------------------------- File 1
const ordinal = require("ordinal");
const { days, months } = require("date-names");

exports.formatDate = function(date, format) {
  return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
    if (tag == "YYYY") return date.getFullYear();
    if (tag == "M") return date.getMonth();
    if (tag == "MMMM") return months[date.getMonth()];
    if (tag == "D") return date.getDate();
    if (tag == "Do") return ordinal(date.getDate());
    if (tag == "dddd") return days[date.getDay()];
  });
};

// ----------------------------------------- File 2
const { formatDate } = require("./format-date");

console.log(formatDate(new Date(2017, 9, 13), "dddd the Do"));
// → Friday the 13th


/* 📃 ECMAScript Modules
  # The main concepts of dependencies and interfaces. The notation is now integrated into the lenguage. Instead of calling a function to acces a dependency. With the special *import* keyword
*/

import ordinal from 'ordinal';
import {days, months} from 'date-names';

export function formatDate(date, format){
    /* ... */
}

//Create a default export, write export default before an expression, a function declaration or a class declaration
export default ['Winter', 'Spring', 'Summer', 'Autumn']
export default function plusOne(n){return n + 1}

//Rename imported binding
import { days as dayNames } from 'date-names';
console.log(dayNames.length); // → 7


/* 📃 Building and bundling
  # Because fetching a single big file tends to be faster than fetching a lot of tiny ones, web programmers have started using tools that roll their programs( wich they painstakingly split into modules) bacj into a single big file before they publich in to the Web.
  Such tools are called *bundlers*

  Apart from the number of files, the size of the files also determines how fast they can be transferred over the network. Thus, the JS Community has invented *minifiers*. 
  These are tools that take JS program and make it smaller by automatically removing comments and whitespace, renaming binding, and replacing pieces of code with equivalent code that make up less space.
*/


/* 📃 Module design
  # Structuring programs is one of the subtler aspects of programming. Any nontrivial piece of functionality can be modeled in various ways.

  One aspect of module design is ease of use. It is helpful if your interface is simple and predictable.

*/