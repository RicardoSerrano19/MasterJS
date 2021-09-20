/* Regexp golf🏆 
#  Code golf is a term used for the game of trying to express a particular
program in as few characters as possible. Similarly, regexp golf is the
practice of writing as tiny a regular expression as possible to match a
given pattern, and only that pattern.
*/

function verify(regex, yes, no) {
  yes.forEach((t) => {
    if (!regex.test(t)) {
      console.log(`Failure to match '${t}'`);
    }
  });

  no.forEach((t) => {
    if (regex.test(t)) {
      console.log(`Failure to match '${t}'`);
    }
  });
}

// 🔴 car and cat
let regex1 = /cat|car/; // -> ca[rt]
verify(regex1, ['my car', 'bad cats'], ['camper', 'high art']);

// 🔴 pop and prop
let regex2 = /pop|prop/; // -> pr?op
verify(regex2, ['pop culture', 'mad props'], ['plop']);

// 🔴 pop and prop
let regex3 = /ferret|ferry|ferrari/; // -> ferr(et|y|ari)
verify(regex3, ['ferret', 'ferry', 'ferrari'], ['ferrum', 'transfer A']);

// 🔴 Any word ending in ious
let regex4 = /ious\b/;
verify(
  regex4,
  ['how delicious', 'spacious room'],
  ['ruinous', 'consciousness']
);

// 🔴 A whitespace character followed by a period, comma, colon, or semicolon
let regex5 = /\s+[\.,;:]/;
verify(regex5, ['bad punctuation .'], ['escape the dot']);

// 🔴 A word longer than six letters
let regex6 = /\w{7,}/;
verify(regex6, ['hottentottententen'], ['no', 'hotten totten tenten']);

// 🔴 A word without the letter e (or E)
let regex7 = /\b[^\We]+\b/;
verify(
  regex7,
  ['red platypus', 'wobbling nest'],
  ['earth bed', 'learning ape']
);

/* Quoting style🏆 
#  Imagine you have written a story and used single quotation marks
throughout to mark pieces of dialogue. Now you want to replace all
the dialogue quotes with double quotes, while keeping the single quotes
used in contractions like aren’t.
Think of a pattern that distinguishes these two kinds of quote usage
and craft a call to the replace method that does the proper replacement.
*/

var text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
console.log(text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'));