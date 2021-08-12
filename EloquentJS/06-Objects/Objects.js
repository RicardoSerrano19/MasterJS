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
let sym = Symbol('name');
console.log(sym == Symbol('name'));
// → false
RabbitClass.prototype[sym] = 55;
console.log(blackRabbitC[sym]);
// → 55

const toStringSymbol = Symbol('toString');
Array.prototype[toStringSymbol] = function () {
  return `${this.length} cm of blue yarn`;
};
console.log([1, 2].toString());
console.log([1, 2][toStringSymbol]());
let stringObject = {
  [toStringSymbol]() {
    return 'a jute rope';
  },
};
console.log(stringObject[toStringSymbol]());
// → a jute rope

// 📃 The iterator interface
let okIterator = 'OK'[Symbol.iterator]();
console.log(okIterator.next());
// → {value: "O", done: false}
console.log(okIterator.next());
// → {value: "K", done: false}
console.log(okIterator.next());
// → {value: undefined, done: true}

class Matrix {
  constructor(width, height, element = (x, y) => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.content[y * width + x] = element(x, y);
      }
    }
  }
  get(x, y) {
    return this.content[y * this.width + x];
  }
  set(x, y, value) {
    content[y * this.width + x] = value;
  }
}

class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }
  next() {
    if (this.y == this.matrix.height) return { done: true };
    let value = {
      x: this.x,
      y: this.y,
      value: this.matrix.get(this.x, this.y),
    };
    this.x++;
    if (this.x == this.matrix.width) {
      this.x = 0;
      this.y++;
    }
    return { value, done: false };
  }
}
Matrix.prototype[Symbol.iterator] = function () {
  return new MatrixIterator(this);
};

let matrix = new Matrix(2, 2, (x, y) => `value ${x},${y}`);
for (let element of matrix) {
  console.log(element);
}

// 📃 Getters, setters and statics
let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  },
};

console.log(varyingSize.size);
console.log(varyingSize.size);

class Temperature {
  constructor(celsius) {
    this.celsius = this.parseNum(celsius);
  }

  get fahrenheit() {
    return this.parseNum(this.celsius * 1.8 + 32);
  }

  set fahrenheit(value) {
    this.celsius = this.parseNum((value - 32) / 1.8);
  }

  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }

  parseNum(value, decimals = 2) {
    return Number.parseFloat(value).toFixed(decimals);
  }
}

let temp = new Temperature(22);
console.log(temp);
temp.fahrenheit = 86;
console.log(temp);
let tempFromFahrenheit = Temperature.fromFahrenheit(90);
console.log(tempFromFahrenheit);

// 📃 Inheritance
class SymmetricMatrix extends Matrix {
  constructor(size, element = (x, y) => undefined) {
    super(size, size, (x, y) => {
      if (x < y) return element(y, x);
      else return element(x, y);
    });
  }
  set(x, y, value) {
    super.set(x, y, value);
    if (x != y) {
      super.set(y, x, value);
    }
  }
}

let symMatrix = new SymmetricMatrix(5, (x, y) => `${x},${y}`);
console.log(symMatrix);
console.log(symMatrix.get(3, 2));

// 📃 The instanceof operator
console.log(new SymmetricMatrix(2) instanceof SymmetricMatrix);
// → true
console.log(new SymmetricMatrix(2) instanceof Matrix);
// → true
console.log(new Matrix(2, 2) instanceof SymmetricMatrix);
// → false
console.log([1] instanceof Array);
// → true
