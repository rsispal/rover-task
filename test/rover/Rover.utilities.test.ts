import { parseCoordinates, computeLeftDirection, computeRightDirection, isEven, isOdd, isGte } from "../../src/rover/Rover.utilities";
import { Direction } from "../../src/types/types";

describe("Utilities", () => {
    describe("parseCoordinates", () => {
        it.each([
            ["0 0", {x: 0, y: 0}],
            ["0 5", {x: 0, y: 5}],
            ["5 0", {x: 5, y: 0}],
            ["5 5", {x: 5, y: 5}],

        ])("Should parse valid coordinates into Coordinates payload", (input, output) => {
            expect(parseCoordinates(input)).toEqual(output);
        });

        it.each([
            ["0 X", "Invalid input format. Expected format: 'number number' with positive two-digit numbers only"],
            ["0 -5", "Invalid input format. Expected format: 'number number' with positive two-digit numbers only"],
            ["-5 5", "Invalid input format. Expected format: 'number number' with positive two-digit numbers only"],

        ])("Should throw error when invalid coordinates %s supplied", (input, output) => {
            expect(() => parseCoordinates(input)).toThrow(output);
        });
    });

    describe('computeLeftDirection', () => {
        it("Should return WEST when the current direction is NORTH", () => {
            expect(computeLeftDirection(Direction.NORTH)).toBe(Direction.WEST);
        });

        it("Should return SOUTH when the current direction is WEST", () => {
            expect(computeLeftDirection(Direction.WEST)).toBe(Direction.SOUTH);
        });

        it("Should return EAST when the current direction is SOUTH", () => {
            expect(computeLeftDirection(Direction.SOUTH)).toBe(Direction.EAST);
        });

        it("Should return NORTH when the current direction is EAST", () => {
            expect(computeLeftDirection(Direction.EAST)).toBe(Direction.NORTH);
        });

        it("Should throw an error for an invalid direction", () => {
            expect(() => computeLeftDirection("INVALID" as Direction)).toThrow("Invalid direction");
        });
        });

    describe("computeRightDirection", () => {
        it("Should return EAST when the current direction is NORTH", () => {
            expect(computeRightDirection(Direction.NORTH)).toBe(Direction.EAST);
        });

        it("Should return SOUTH when the current direction is EAST", () => {
            expect(computeRightDirection(Direction.EAST)).toBe(Direction.SOUTH);
        });

        it("Should return WEST when the current direction is SOUTH", () => {
            expect(computeRightDirection(Direction.SOUTH)).toBe(Direction.WEST);
        });

        it("Should return NORTH when the current direction is WEST", () => {
            expect(computeRightDirection(Direction.WEST)).toBe(Direction.NORTH);
        });

        it("Should throw an error for an invalid direction", () => {
            expect(() => computeRightDirection("INVALID" as Direction)).toThrow("Invalid direction");
        });
    });

    describe("isEven", () => {
        it.each([
          [2,true],
          [3, false],
          [0, true],
        ])("Should determine if %d is an even number by returning %b", (input, output) => {
            expect(isEven(input)).toEqual(output);
        });
    });

    describe("isOdd", () => {
        it.each([
            [2,false],
            [3, true],
            [0, false],
        ])("Should determine if %d is an odd number by returning %b", (input, output) => {
            expect(isOdd(input)).toEqual(output);
        });
    });
    describe("isGte", () => {
        it.each([
            [10, 5, true],
            [5, 5, true],
            [3, 5, false],
            [NaN, 5, false],
        ])("Should determine if %d is greater than or equal to %d", (param1, param2, output) => {
            expect(isGte(param1, param2)).toEqual(output);
        });
    });
});