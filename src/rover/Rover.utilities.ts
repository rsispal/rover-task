import { Coordinates, Direction, DirectionPayload } from "../types/types";
import { Validation } from "./Rover.validation";

export const computeLeftDirection = (currentDirection: Direction): Direction => {
    switch (currentDirection) {
        case Direction.NORTH:
            return Direction.WEST;
        case Direction.WEST:
            return Direction.SOUTH;
        case Direction.SOUTH:
            return Direction.EAST;
        case Direction.EAST:
            return Direction.NORTH;
        default:
        throw new Error('Invalid direction');
    }
}

export const computeRightDirection = (currentDirection: Direction): Direction => {
    switch (currentDirection) {
        case Direction.NORTH:
            return Direction.EAST;
        case Direction.EAST:
            return Direction.SOUTH;
        case Direction.SOUTH:
            return Direction.WEST;
        case Direction.WEST:
            return Direction.NORTH;
        default:
        throw new Error('Invalid direction');
    }
}

export const parseCoordinates = (input: string): Coordinates => {
    const trimmed = input.trim().replace(/\s+/g, ' ');  
    const match = trimmed.match(/^(\d{1,2}) (\d{1,2})$/);
  
    if (!match) {
      throw new Error("Invalid input format. Expected format: 'number number' with positive two-digit numbers only");
    }
    
    const x = parseInt(match[1], 10);
    const y = parseInt(match[2], 10);

    return { x, y };
  }

export const  parseDirectionPayload = (input: string): DirectionPayload => {
    const result = input
    .trim() 
    .replace(/\s+/g, ' ') 
    .split(' ');
    if (result.length !== 3) {
        throw new Error('Invalid input format. Expected format: "number number string"');
    }

    const [x, y, direction] = result;

    const xParsed = parseInt(x, 10);
    const yParsed = parseInt(y, 10);

    if (!Validation.isDirectionPayloadValid(xParsed, yParsed, direction)) {
        throw new Error('Invalid direction payload values');
    }

    return {
        x: xParsed,
        y: yParsed,
        direction: direction as Direction,
    };
}

export const isEven = (n:number) => n % 2 == 0;

export const isOdd = (n:number) => !isEven(n);

export const isGte = (value: number, limit: number): boolean => {
    return !isNaN(value) && value >= limit;
}