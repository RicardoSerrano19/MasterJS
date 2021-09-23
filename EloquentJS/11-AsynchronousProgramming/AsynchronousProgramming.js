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