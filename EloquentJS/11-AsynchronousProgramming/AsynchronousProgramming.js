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

setTimeout(() => console.log('Tick'), 3000);
