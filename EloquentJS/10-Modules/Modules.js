
/* 📃 Modules
  # The ideal program has a crystal-clear structure. The way it works is easy to explain, and each part plays a well-defined role.

  Two issues if we don't use modules:
  - If everything can touch everything else, it is difficult to look a any given piece in isolation.
  - If you want to use any of the functionality from such program in another situation, rewriting it may be easier than trying to disentangle it from its context.

  Modules are an attempt to avoid these problems. A *module* is a piece of program that specifies wich other pieces it relies on and wich functionality it provides from other modules to use (its interface).

  By restricting the ways in wich modules interact with each other, the system becomes more like LEGO, where pieces interact through well-defined conectors, and less like mud, where everything mixes with everything.

  The relations between modules are called *dependencies*. When module needs a piece from another module, it is said to depend on that module.
*/