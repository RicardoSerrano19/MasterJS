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


  /* 📃 Failure
  # Promises can be either resolved (the action finished successfully) or rejected (it failed).

  When a handler throws an exception, the exception value is used as the reason.
  There's a Promise.reject function that createa a new rejected promise.
  
  Promises have a catch method that registers a handler to be called when the promise is rejected.
*/

new Promise((_, reject) => reject(new Error('Fail')))
  .then(value => console.log('Handler 1'))
  .catch(reason => {
    console.log('Caught failure' + reason);
    return 'nothing';
  })
  .then(value => console.log('Handler 2', value));

// → Caught failure Error: Fail
// → Handler 2 nothing


/* 📃 Networks are hard
  #
*/

class Timeout extends Error{}

function request(nest, target, type, content){
  return new Promise((resolve, reject) => {
    let done = false;
    function attempt(n){
      nest.send(target, type, content, (failed, value) =>{
        done = true;
        if(failed) reject(failed);
        else resolve (value);
      });
      setTimeout(() => {
        if (done) return;
        else if(n < 3) attempt(n+1);
        else reject(new Timeout('Timed out'));
      }, 250);
    }
    attempt(1);
  })
}

function requestType(name, handler){
  defineRequestType(name, (nest, content, source, callback) =>{
    try{
      Promise.resolve(handler(nest, content, source))
        .then(response => callback(null, response), failure => callback(failure));
    }catch (exception){
      callback(exception);
    }
  });
}


/* 📃 Collections of promises
  # When running with collections of promises running at the same time. Promise.all function can be useful. It returns a promise that waits for all of the promises in the array to resolve and then resolves to an array of the values that these promises produced.

  If any promise is rejected, the result of Promise.all it itself rejected
*/
requestType("ping", () => "pong");
function availableNeighbors(nest) {
  let requests = nest.neighbors.map(neighbor => {
    return request(nest, neighbor, "ping").then(
      () => true,
      () => false
    );
  });
  return Promise.all(requests).then(result => {
    return nest.neighbors.filter((_, i) => result[i]);
  });
}


/* 📃 Network Flooding
  # 
*/

import { everywhere } from './crow-tech.js'

everywhere(nest => {
  nest.state.gossip = [];
});

function sendGossip(nest, message, exceptFor = null){
  nest.state.gossip.push(message);
  for(let neighbor of nest.neighbors){
    if(neighbor == exceptFor) continue;
    request(nest, neighbor, "gossip", message);
  }
}

requestType("gossip", (nest, message, source) => {
  if(nest.state.gossip.includes(message)) return;
  console.log(`${nest.name} received gossip '${message}' from ${source}`);
  sendGossip(nest, message, source);
})


/* 📃 Message Routing
  # If a given node wants to talk to a single other node, flooding is not a very efficient approach.
  Since each nest knows only about its direct neighbors, it doesn’t have the information it needs to compute a route. We must somehow spread the information about these connections to all nests, preferably in a way that allows it to change over time, when nests are abandoned or new nests are built.
*/

requestType('connections', (nest, {name, neighbors}, source) =>{
  let connections = nest.state.connections;
  if(JSON.stringify(connections.get(name)) == JSON.stringify(neighbors)) return;
  connections.set(name, neighbors);
  broadcastConnections(nest, name, source);
})

function broadcastConnections(nest, name, exceptFor = null){
  for(let neighbor of nest.neighbors){
    if(neighbor == exceptFor) continue;
    request(
      nest, 
      neighbor, 
      'connections', 
      {name, neighbors: nest.state.connections.get(name)}
    );
  }
}

everywhere(nest => {
  nest.state.connections = new Map();
  nest.state.connections.set(nest.name, nest.neighbors);
  broadcastConnections(nest, nest.name)
})

function findRoute(from, to, connections) {
  let work = [{ at: from, via: null }];
  for (let i = 0; i < work.length; i++) {
    let { at, via } = work[i];
    for (let next of connections.get(at) || []) {
      if (next == to) return via;
      if (!work.some(w => w.at == next)) {
        work.push({ at: next, via: via || next });
      }
    }
  }
  return null;
}

function routeRequest(nest, target, type, content) {
  if (nest.neighbors.includes(target)) {
    return request(nest, target, type, content);
  } else {
    let via = findRoute(nest.name, target, nest.state.connections);
    if (!via) throw new Error(`No route to ${target}`);
    return request(nest, via, "route", { target, type, content });
  }
}
requestType("route", (nest, { target, type, content }) => {
  return routeRequest(nest, target, type, content);
});