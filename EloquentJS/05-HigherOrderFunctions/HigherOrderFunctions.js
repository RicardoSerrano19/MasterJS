let total = 0;
let count = 1;
while (count <= 10) {
  total += count;
  count += 1;
}
console.log(total);

const range = (from, to) => {
  let array = [];
  if (from < to) {
    for (from; from <= to; from++) array.push(from);
  } else {
    for (from; from >= to; from--) array.push(from);
  }
  return array;
};

const sum = (nums) => {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) sum += nums[i];
  return sum;
};

console.log(sum(range(-1, 10)));

//Abstraccion repetition
function repeat(n, action) {
  for (let i = 0; i < n; i++) action(i);
}

repeat(3, console.log);

let labels = [];
repeat(5, (i) => {
  labels.push(`Unit ${i + 1}`);
});
console.log(labels);

//Higher-order Functions
function graterThan(n) {
  return (m) => m > n;
}

let greaterThan10 = graterThan(10);
console.log(greaterThan10(1));
//-- Es igual a --> //
function graterThan2(n) {
  return function (m) {
    return m > n;
  };
}
let greaterThan11 = graterThan2(10);
console.log(greaterThan11(11));

function noisy(f) {
  return (...args) => {
    console.log('calling with', args);
    let result = f(...args);
    console.log('called with', args, ', returned', result);
    return result;
  };
}

noisy(Math.max)(3, 2, 1, 0);

function unless(test, then) {
  if (!test) then();
}
repeat(3, (n) => {
  unless(n % 2 == 1, () => {
    console.log(n, 'is even');
  });
});

['A', 'B'].forEach((letter) => console.log(letter));
