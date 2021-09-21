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