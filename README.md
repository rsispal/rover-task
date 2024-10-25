# Rover Task
Per the specification, this codebase will generate a series of "Mars Rovers" based on an input command set. Their final positions will be printed out after the commands are processed into coordinates as follows:

```sh
Running landOnPlateau with input payload: 
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM

Output:-----
1 3 N
5 1 E
```


## How do I run?
1. `npm install` in the root directory
2. `npm run rover` (tests will run, TS will be built, manual test script will print rovers output)


## Expected Output:
```sh
➜ rover-task (main) ✗ npm run rover

> rover-task@0.0.1 rover
> npm run test && npm run build && node ./rover_output.js


> rover-task@0.0.1 test
> jest --config jest.config.js --coverage --coverageReporters="text-summary"

 PASS  test/rover/Rover.class.test.ts
  RoverClass
    ✓ Should instantiate with valid grid bounds (1 ms)
    ✓ Should throw an error for negative X axis bounds (8 ms)
    ✓ Should throw an error for negative Y axis bounds
    setInitialPosition
      ✓ Should set initial position successfully with valid input (1 ms)
      ✓ Should throw an error when initial x position is out of bounds
      ✓ Should throw an error when initial y position is out of bounds (1 ms)
      ✓ Should throw an error when initial x position is negative (3 ms)
      ✓ Should throw an error when initial y position is negative
      ✓ Should throw an error when direction is invalid (1 ms)
    direct
      ✓ Should return correct position when valid directions supplied (initial: 0 0 N, input: L, output: 0 0 W
      ✓ Should return correct position when valid directions supplied (initial: 0 0 E, input: L, output: 0 0 N
      ✓ Should return correct position when valid directions supplied (initial: 0 0 S, input: L, output: 0 0 E
      ✓ Should return correct position when valid directions supplied (initial: 0 0 W, input: L, output: 0 0 S (1 ms)
      ✓ Should return correct position when valid directions supplied (initial: 0 0 N, input: R, output: 0 0 E
      ✓ Should return correct position when valid directions supplied (initial: 0 0 E, input: R, output: 0 0 S
      ✓ Should return correct position when valid directions supplied (initial: 0 0 S, input: R, output: 0 0 W
      ✓ Should return correct position when valid directions supplied (initial: 0 0 W, input: R, output: 0 0 N
      ✓ Should return correct position when valid directions supplied (initial: 1 1 N, input: M, output: 1 2 N (2 ms)
      ✓ Should return correct position when valid directions supplied (initial: 1 1 E, input: M, output: 2 1 E
      ✓ Should return correct position when valid directions supplied (initial: 1 1 S, input: M, output: 1 0 S
      ✓ Should return correct position when valid directions supplied (initial: 1 1 W, input: M, output: 0 1 W
      ✓ Should return correct position when valid directions supplied (initial: 0 0 N, input: RMLM, output: 1 1 N
      ✓ Should return correct position when valid directions supplied (initial: 5 5 N, input: LMLM, output: 4 4 S
      ✓ Should return correct position when valid directions supplied (initial: 1 2 N, input: LMLMLMLMM, output: 1 3 N
      ✓ Should return correct position when valid directions supplied (initial: 3 3 E, input: MMRMMRMRRM, output: 5 1 E
      ✓ Should throw an error when an unsupported navigation instruction is supplied
      ✓ Should return correct errors when invalid directions supplied (initial: 5 5 N, input: RM, error: MOVE to EAST is out of bounds (instruction 2 in RM)
      ✓ Should return correct errors when invalid directions supplied (initial: 0 0 E, input: RM, error: MOVE to SOUTH is out of bounds (instruction 2 in RM) (1 ms)
      ✓ Should return correct errors when invalid directions supplied (initial: 5 4 E, input: LMM, error: MOVE to NORTH is out of bounds (instruction 3 in LMM)
      ✓ Should return correct errors when invalid directions supplied (initial: 0 0 N, input: LM, error: MOVE to WEST is out of bounds (instruction 2 in LM)

 PASS  test/rover/Rover.validation.test.ts
  Validation
    isDirectionValid
      ✓ Should return true for a valid direction N (1 ms)
      ✓ Should return true when a valid direction E
      ✓ Should return true when a valid direction S
      ✓ Should return true when a valid direction W
      ✓ Should return false when an invalid direction provided
      ✓ Should return false when an empty direction string
    isDirectionPayloadValid
      ✓ Should return true when valid x, y and direction proided
      ✓ Should return false when x less than 0
      ✓ Should return false when y less than 0
      ✓ Should return false when an invalid direction provided
      ✓ Should return false when non-numeric x and y values provided

 PASS  test/rover/RoverOrchestrator.class.test.ts
  RoversOrchestrator
    landOnPlateau
      ✓ Should return expected output from supplied test cases

 PASS  test/rover/Rover.utilities.test.ts
  Utilities
    parseCoordinates
      ✓ Should parse valid coordinates into Coordinates payload (1 ms)
      ✓ Should parse valid coordinates into Coordinates payload
      ✓ Should parse valid coordinates into Coordinates payload
      ✓ Should parse valid coordinates into Coordinates payload
      ✓ Should throw error when invalid coordinates 0 X supplied (5 ms)
      ✓ Should throw error when invalid coordinates 0 -5 supplied (1 ms)
      ✓ Should throw error when invalid coordinates -5 5 supplied
    computeLeftDirection
      ✓ Should return WEST when the current direction is NORTH
      ✓ Should return SOUTH when the current direction is WEST
      ✓ Should return EAST when the current direction is SOUTH
      ✓ Should return NORTH when the current direction is EAST
      ✓ Should throw an error for an invalid direction (1 ms)
    computeRightDirection
      ✓ Should return EAST when the current direction is NORTH
      ✓ Should return SOUTH when the current direction is EAST
      ✓ Should return WEST when the current direction is SOUTH (1 ms)
      ✓ Should return NORTH when the current direction is WEST
      ✓ Should throw an error for an invalid direction
    isEven
      ✓ Should determine if 2 is an even number by returning %b
      ✓ Should determine if 3 is an even number by returning %b
      ✓ Should determine if 0 is an even number by returning %b
    isOdd
      ✓ Should determine if 2 is an odd number by returning %b
      ✓ Should determine if 3 is an odd number by returning %b
      ✓ Should determine if 0 is an odd number by returning %b
    isGte
      ✓ Should determine if 10 is greater than or equal to 5
      ✓ Should determine if 5 is greater than or equal to 5
      ✓ Should determine if 3 is greater than or equal to 5
      ✓ Should determine if NaN is greater than or equal to 5


=============================== Coverage summary ===============================
Statements   : 98.11% ( 104/106 )
Branches     : 94.73% ( 54/57 )
Functions    : 100% ( 16/16 )
Lines        : 98.03% ( 100/102 )
================================================================================
Test Suites: 4 passed, 4 total
Tests:       69 passed, 69 total
Snapshots:   0 total
Time:        0.362 s, estimated 1 s
Ran all test suites.

> rover-task@0.0.1 build
> rm -rf ./dist && tsc

Running landOnPlateau with input payload: 
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM

Output:-----
1 3 N
5 1 E
```