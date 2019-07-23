# Property Based Testing

## Contract Based Programming

Every time we write code, we expect it to solve a well defined, real world problem,
to that end we create code to test that our code behave as expected to some degree, such as unit tests, integration tests and acceptance tests.

Implicitly, we have conditions that must be satisfied before and after a program executes, after all, the job of every program is to read some data and spit some data back. Contracts are a way of defining real-world dynamic behaviour inside our code.

Inside a computer program, contracts can never be broken and it they are, the program execution must be stopped immediately.

### Precondition Contracts

The conditions required for a function or unit of code to work properly, a broken precondition means the caller made a mistake.

### Postcondition Contracts

The conditions that a piece of code guarantee to be true, given the preconditions. A failure to fulfill a postcondition contract means something is wrong with the function implementation, this
is the heart of property based testing.

## What is property based testing

Unit tests are a form of example testing, we avoid regression of a behaviour after fixing or implementing it by creating an unit test, still, there can be a set of problems related to other set of inputs. Property based testing is based on the idea of generating test cases and checking if some invariant is upheld.

This way, we only need to know the preconditions and postconditions of a piece of code to generate automated tests for it. This is necessary because programmers cannot possibly think of all the possible cases where things can go wrong if the input is large enough.

![Bob Ross Meme with caption: 'We don't make mistakes - we just make happy accidents.'](resources/bobross.gif)




## What are the use cases?

Usually, pure and idempotent functions are good candidates for property based checks, it's also easier to setup preconditions to input if those are of a know type.






[Use Cases - Hypothesis](https://hypothesis.readthedocs.io/en/latest/endorsements.html)

## Examples