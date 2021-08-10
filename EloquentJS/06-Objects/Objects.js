// 📃 Methods
let rabbit = {};
rabbit.speak = function (line) {
  console.log(`The rabbit says '${line}'`);
};

rabbit.speak("I'm alive");

// 📃 This

const speak = function (line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};
let whiteRabbit = { type: 'white', speak };
let hungryRabbit = { type: 'hungry', speak };

whiteRabbit.speak('Oh my ears and whiskers, ' + "how late it's getting!");
hungryRabbit.speak('I could use a carrot right now.');

speak.call(hungryRabbit, 'Burp!');
function normalize() {
  console.log(this.coords.map((n) => n / this.length));
}
normalize.call({ coords: [0, 2, 3], length: 5 });

// 📃 Prototypes
let empty = {};
console.log(empty.toString);
// → function toString()...{}
console.log(empty.toString());
// → [object Object]

console.log(Object.getPrototypeOf({}) == Object.prototype);
// → true
console.log(Object.getPrototypeOf(Math.max) == Function.prototype);
// → true
console.log(Object.getPrototypeOf([]) == Array.prototype);
// → true

let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  },
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.speak('SKREEEE!');
killerRabbit.type = 'killer';
killerRabbit.speak('SKREEEE!');
killerRabbit;

// 📃 Classes
function Rabbit(type) {
  this.type = type;
}
Rabbit.prototype.speak = function (line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};
let weirdRabbit = new Rabbit('weird');
weirdRabbit.speak('Hola soy el pana rabbit');
weirdRabbit;
