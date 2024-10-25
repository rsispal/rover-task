import { RoverClass } from "../../src/rover/Rover.class";

describe("RoverClass", () => {

    it("Should instantiate with valid grid bounds", () => {
        expect(new RoverClass(3,3)).toBeInstanceOf(RoverClass);
    });

    it("Should throw an error for negative X axis bounds", () => {
        expect(() => new RoverClass(-3,3)).toThrow(Error);
    });

    it("Should throw an error for negative Y axis bounds", () => {
        expect(() => new RoverClass(3,-3)).toThrow(Error);
    });
    
    describe("setInitialPosition", () => {
        let rover: RoverClass;

        beforeEach(() => {
            rover = new RoverClass(5, 5);
        });
    
        it("Should set initial position successfully with valid input", () => {
            expect(rover.setInitialPosition("1 3 N")).toEqual(true);
        });

        it("Should throw an error when initial x position is out of bounds", () => {
            expect(() => rover.setInitialPosition("9 0 N")).toThrow("Initial x position is out of bounds")
        });

        it("Should throw an error when initial y position is out of bounds", () => {
            expect(() => rover.setInitialPosition("0 9 N")).toThrow("Initial y position is out of bounds")
        });

        it("Should throw an error when initial x position is negative", () => {
            expect(() => rover.setInitialPosition("-9 0 N")).toThrow("Invalid direction payload values")
        });

        it("Should throw an error when initial y position is negative", () => {
            expect(() => rover.setInitialPosition("0 -9 N")).toThrow("Invalid direction payload values")
        });

        it("Should throw an error when direction is invalid", () => {
            expect(() => rover.setInitialPosition("X 0 N")).toThrow("Invalid direction payload values")
        });
    });

    describe("direct", () => {
        let rover: RoverClass;

        beforeEach(() => {
            rover = new RoverClass(5, 5);
        });

        it.each([
          ["0 0 N", "L", "0 0 W"],
          ["0 0 E", "L", "0 0 N"],
          ["0 0 S", "L", "0 0 E"],
          ["0 0 W", "L", "0 0 S"],
          ["0 0 N", "R", "0 0 E"],
          ["0 0 E", "R", "0 0 S"],
          ["0 0 S", "R", "0 0 W"],
          ["0 0 W", "R", "0 0 N"],
          ["1 1 N", "M", "1 2 N"],
          ["1 1 E", "M", "2 1 E"],
          ["1 1 S", "M", "1 0 S"],
          ["1 1 W", "M", "0 1 W"],
          ["0 0 N", "RMLM", "1 1 N"],
          ["5 5 N", "LMLM", "4 4 S"],
          ["1 2 N", "LMLMLMLMM", "1 3 N"],
          ["3 3 E", "MMRMMRMRRM", "5 1 E"],

        ])("Should return correct position when valid directions supplied (initial: %s, input: %s, output: %s", (initial, command, output) => {
            rover.setInitialPosition(initial);
            expect(rover.direct(command)).toEqual(output);
        });

        it("Should throw an error when an unsupported navigation instruction is supplied", () => {
            expect(() => rover.direct("X")).toThrow("Unsupported direction instruction: X");
        });
        
        it.each([
          ["5 5 N", "RM", "MOVE to EAST is out of bounds (instruction 2 in RM)"], // Moving out of bounds EAST
          ["0 0 E", "RM", "MOVE to SOUTH is out of bounds (instruction 2 in RM)"], // Moving out of bounds SOUTH
          ["5 4 E", "LMM", "MOVE to NORTH is out of bounds (instruction 3 in LMM)"], // Moving out of bounds NORTH
          ["0 0 N", "LM", "MOVE to WEST is out of bounds (instruction 2 in LM)"], // Moving out of bounds WEST

        ])("Should return correct errors when invalid directions supplied (initial: %s, input: %s, error: %s", (initial, command, error) => {
            rover.setInitialPosition(initial);
            expect(() => rover.direct(command)).toThrow(error);
        });
    });
});
