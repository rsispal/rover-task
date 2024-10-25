import { Validation } from "../../src/rover/Rover.validation";
import { Direction } from "../../src/types/types";

describe("Validation", () => {
    describe("isDirectionValid", () => {
        it("Should return true for a valid direction N", () => {
            expect(Validation.isDirectionValid(Direction.NORTH)).toBe(true);
        });

        it("Should return true when a valid direction E", () => {
            expect(Validation.isDirectionValid(Direction.EAST)).toBe(true);
        });

        it("Should return true when a valid direction S", () => {
            expect(Validation.isDirectionValid(Direction.SOUTH)).toBe(true);
        });

        it("Should return true when a valid direction W", () => {
            expect(Validation.isDirectionValid(Direction.WEST)).toBe(true);
        });

        it("Should return false when an invalid direction provided", () => {
            expect(Validation.isDirectionValid('F')).toBe(false);
        });

        it("Should return false when an empty direction string", () => {
            expect(Validation.isDirectionValid('')).toBe(false);
        });
    });

    describe("isDirectionPayloadValid", () => {
        it("Should return true when valid x, y and direction proided", () => {
            expect(Validation.isDirectionPayloadValid(10, 20, Direction.NORTH)).toBe(true);
        });

        it("Should return false when x less than 0", () => {
            expect(Validation.isDirectionPayloadValid(-1, 20, Direction.NORTH)).toBe(false);
        });

        it("Should return false when y less than 0", () => {
            expect(Validation.isDirectionPayloadValid(10, -5, Direction.NORTH)).toBe(false);
        });

        it("Should return false when an invalid direction provided", () => {
            expect(Validation.isDirectionPayloadValid(10, 20, 'F')).toBe(false);
        });

        it("Should return false when non-numeric x and y values provided", () => {
            expect(Validation.isDirectionPayloadValid(NaN, NaN, Direction.SOUTH)).toBe(false);
        });
    });
});