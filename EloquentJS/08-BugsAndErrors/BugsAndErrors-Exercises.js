/* Retry 🏆 
#  Say you have a function primitiveMultiply that in 20 percent of cases
multiplies two numbers and in the other 80 percent of cases raises an ex-
ception of type MultiplicatorUnitFailure . Write a function that wraps
this clunky function and just keeps trying until a call succeeds, after
which it returns the result.
Make sure you handle only the exceptions you are trying to handle.
*/

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure(
      `Failure trying to multiply ${a} and ${b}`
    );
  }
}

function reliableMultiply(a, b) {
  try {
    return primitiveMultiply(a, b);
  } catch (ex) {
    if (ex instanceof MultiplicatorUnitFailure) {
      return 'MultiplicatorUnitFailure Exception';
    } else {
      throw ex;
    }
  }
}

reliableMultiply(8, 8);
