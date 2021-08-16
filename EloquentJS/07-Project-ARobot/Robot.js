/* 📏 Overview
# Automaton, a little program
that performs a task in a virtual world. Our automaton will be a mail-
delivery robot picking up and dropping off parcels.
*/
/*
# 🔴 Meadowfield
The village of Meadowfield isn’t very big. It consists of 11 places with
14 roads between them. It can be described with this array of roads:
*/
const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Shop",
  'Marketplace-Post Office',
  'Marketplace-Town Hall',
  "Grete's House-Farm",
  'Marketplace-Farm',
  'Marketplace-Shop',
  'Shop-Town Hall',
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map((r) => r.split('-'))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);
roadGraph;
/*
# 🔴 The task
Village State
  - Place: Robot Current Location
  - Parcels: Collection undelivered parcels [CurrentLocation, DestinationAdress]
*/
class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }
  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map((p) => {
          if (p.place != this.place) return p;
          return { place: destination, address: p.address };
        })
        .filter((p) => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

let first = new VillageState('Post Office', [
  { place: 'Post Office', address: "Alice's House" },
]);
let next = first.move("Alice's House");
console.log(next.place);
// → Alice's House
console.log(next.parcels);
// → []
console.log(first.place);
// → Post Office

/*
# 🔴 Persistent data
Data structures that don’t change are called immutable or persistent.
a function called Object.freeze that changes an object so that writing
to its properties is ignored.
*/

let object = Object.freeze({ value: 5 });
object.value = 10;
console.log(object.value); // -> 5 . Initial value

/*
# 🔴 Simulation
A delivery robot looks at the world and decides in which direction it
wants to move. As such, we could say that a robot is a function that
takes a VillageState object and returns the name of a nearby place.
Because we want robots to be able to remember things, so that they
can make and execute plans, we also pass them their memory and allow
them to return a new memory. Thus, the thing a robot returns is an
object containing both the direction it wants to move in and a memory
value that will be given back to it the next time it is called.
*/

