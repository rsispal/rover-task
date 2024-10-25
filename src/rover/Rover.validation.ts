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
}

