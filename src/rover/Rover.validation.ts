import { Direction } from "../types/types";
import { isGte } from "./Rover.utilities";

export class Validation {
    static isDirectionValid(direction: string): boolean {
        const validDirections = Object.values(Direction);
        return validDirections.includes(direction as Direction);
    }

    static isDirectionPayloadValid(x: number, y: number, direction: string): boolean {
        return isGte(x, 0) && isGte(y, 0) && this.isDirectionValid(direction);
    }

    static isGridBoundsString(line: string): boolean {
        return /^\d+\s+\d+$/.test(line);
    }

    static isInitialPositionString(line: string): boolean {
        return /^\d+\s+\d+\s+[NSEW]$/.test(line);
    }

    static isCommandString(line: string): boolean {
        return /^[LRM]+$/.test(line);
    }

    static isValidInitialPosition(x: number, y: number, direction: string) {
        if (!Number.isInteger(x) || x < 0) {
            false;
        }
        if (!Number.isInteger(y) || y < 0) {
            false;
        }
        switch (direction) {
            case Direction.NORTH:
            case Direction.WEST:
            case Direction.SOUTH:
            case Direction.EAST:
                break;
            default:
                return false;
        }

        return true;
    }
}
