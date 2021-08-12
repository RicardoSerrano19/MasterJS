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
whiteRabbit;
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

console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
console.log(Object.getPrototypeOf(weirdRabbit) == Rabbit.prototype);

// 📃 Class Notation
class RabbitClass {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

let killerRabbitC = new RabbitClass('killer');
let blackRabbitC = new RabbitClass('black');
killerRabbitC;

let object = new (class {
  getWord() {
    return 'hello';
  }
})();
object.getWord();

// 📃 Overriding derived properties
RabbitClass.prototype.teeth = 'small';
console.log('1 ->' + killerRabbitC.teeth);
// → small
killerRabbitC.teeth = 'long, sharp, and bloody';
console.log('2 ->' + killerRabbitC.teeth);
// → long, sharp, and bloody
console.log('3 ->' + blackRabbitC.teeth);
// → small
console.log('4 ->' + RabbitClass.prototype.teeth);
// → small

console.log(Array.prototype.toString == Object.prototype.toString);
// → false
console.log([1, 2].toString());
// → 1,2

console.log(Object.prototype.toString.call([1, 2]));
// → [object Array]

// 📃 Maps
let agesObject = {
  Boris: 39,
  Liang: 22,
  Julio: 62,
}; //-> Ages object derivated from Object.prototype
console.log(`Julio is ${agesObject['Julio']} ages`);
console.log('Is Jacks age known?', 'Jack' in agesObject);
console.log('Is toStrings age known?', 'toString' in agesObject);
console.log('toString' in Object.create(null));

let ages = new Map();
ages.set('Boris', 39);
ages.set('Liang', 22);
ages.set('Julio', 22);
console.log(`Julio is ${ages.get('Julio')} ages`);
console.log("Is Jack's age known?", ages.has('Jack'));
console.log(ages.has('toString'));

console.log({ x: 1 }.hasOwnProperty('x'));
console.log({ x: 1 }.hasOwnProperty('toString'));

// 📃 POlymorphism
RabbitClass.prototype.toString = function () {
  return `a ${this.type} rabbit`;
};
console.log(String(blackRabbitC));

// 📃 SYmbols
