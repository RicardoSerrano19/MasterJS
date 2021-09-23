/* 📃 Asynchronicity
  # In a synchronous programming model, thins happen one at a time, it returns only when the action has finished and it can return the result. THis stops you program for the time the action takes
  
  Synchronous single thread of control.
   🟥🟥🟥🟥🟨🟨🟨🟨🟦🟦🟦🟦
   
  An asynchronous model allows multiple thing to happen at the same time. WHen you start an action, your program continues to run.
  
  Asynchronous.
   🟥🟥🟥🟥
    🟨🟨🟨🟨
     🟦🟦🟦🟦
*/

/* 📃 Callbacks
  # One approach to asynchronous programming is to make functions that perform a slow action take an extra argument, a *callback function*. THe action is started, and when it finished, the callback function is called with the result. 

*/

setTimeout(() => console.log('Tick'), 1000); // → Wait 1 second and print 'Tick'

import {bigOak, defineRequestType} from './crow-tech.js';

bigOak.readStorage("food caches", caches => {
  let firstCache = caches[0];
  bigOak.readStorage(
    firstCache, info => {
    console.log(info);
  });
});

defineRequestType('note', (nest, content, source, done) =>{
  console.log(`${nest.name} received note: ${content}`);
  done();
});
bigOak.send('Cow Pasture', 'note', 'Let\'s caw loudly at 7PM', () => console.log('Note delivered.'));


/* 📃 Promises
  # Working with abstract concepts is often easier when those concepts can be represented by values. In the case of asynchronous actions, you could, instead of arranging for a function to be callet at some point in the future, return an object that represents this future event.
  
  A *promise* is an asynchronous action that may complete at some point and produce a value. It is able to notify anyone who is interested when its value is available.

*/

let fiftenn = Promise.resolve(15);
fiftenn.then(value => console.log(`Got ${value}`)); // → Got 15

// To get the result of a promise, you can use its *then method*. This registers a callback function to be called when the promise resolves and produces a value.
// Its posible add multiple callbacks to a single promise, and they will be called, even if you add them after the promise has already resolved (finished)

function storage(nest, name){
  return new Promise(resolve =>{
    nest.readStorage(name, result => resolve(result));
  })
}

storage(bigOak, 'enemies')
  .then(value => console.log("Got", value));