const DATE_UNITS = [
  ['year', 31557000],
  ['month', 2629750],
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
];
let cumpleanos = new Date(2018, 6, 19, 14, 33, 0);
let tiempoPublicacion = cumpleanos.valueOf();
console.log(tiempoPublicacion);

const getDateDiffs = (timestamp) => {
  let seconds = (timestamp - Date.now()) / 1000;
  console.log(seconds);
  for (let [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(seconds) > secondsInUnit || unit == 'second') {
      let value = Math.round(seconds / secondsInUnit);
      return { value, unit };
    }
  }
};

const useTimeAgo = (timestamp) => {
  const { value, unit } = getDateDiffs(timestamp);
  const rtf = new Intl.RelativeTimeFormat(navigator.language, {
    style: 'long',
  });
  return rtf.format(value, unit);
};
//console.log(useTimeAgo(tiempoPublicacion));

const anagrama = (word1, word2) => {
  if (word1.length != word2.length) return false;
  word1 = word1.toLowerCase();
  word2 = word2.toLowerCase();
  for (let i = 0; i < word1.length; i++) {
    if (!word2.includes(word1.charAt(i))) return false;
  }
  return true;
};
console.log(anagrama('Tom Sorvolo Ryddle', 'Soy Lord Voldemort'));


//******  REFACTOR ***////
const orderWords = (word) => {
  let w = Object(word.toLowerCase());
  let value = Object.values(w).sort().toString();
  return value;
};

const anagramaRefactor = (word1, word2) => {
  return orderWords(word1) === orderWords(word2);
};
console.log(anagramaRefactor('Tom Sorvolo Ryddle', 'Soy Lord Voldemort'));

