import { Coordinates, Direction, DirectionPayload, GridBounds, Rover } from "../types/types";
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
            throw new Error("Invalid direction");
    }
};

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
            throw new Error("Invalid direction");
    }
};

export const parseCoordinates = (input: string): Coordinates => {
    const trimmed = input.trim().replace(/\s+/g, " ");
    const match = trimmed.match(/^(\d{1,2}) (\d{1,2})$/);

    if (!match) {
        throw new Error("Invalid input format. Expected format: 'number number' with positive two-digit numbers only");
    }

    const x = parseInt(match[1], 10);
    const y = parseInt(match[2], 10);

    return { x, y };
};

export const parseDirectionPayload = (input: string): DirectionPayload => {
    const result = input.trim().replace(/\s+/g, " ").split(" ");
    if (result.length !== 3) {
        throw new Error('Invalid input format. Expected format: "number number string"');
    }

    const [x, y, direction] = result;

    const xParsed = parseInt(x, 10);
    const yParsed = parseInt(y, 10);

    if (!Validation.isDirectionPayloadValid(xParsed, yParsed, direction)) {
        throw new Error("Invalid direction payload values");
    }

    return {
        x: xParsed,
        y: yParsed,
        direction: direction as Direction,
    };
};

export const isEven = (n: number) => n % 2 == 0;

export const isOdd = (n: number) => !isEven(n);

export const isGte = (value: number, limit: number): boolean => {
    return !isNaN(value) && value >= limit;
};

// V2 parsing

export const parseRoverData = (input: string): { gridBounds: GridBounds; rovers: Rover[] } => {
    const lines = input
        .trim()
        .split(/\r?\n/)
        .map((line) => line.trim());

    if (lines.length < 3) {
        throw new Error("Input must include grid coordinates and at least one rover entry with commands.");
    }

    // Parse grid bounds
    const [gridXStr, gridYStr] = lines[0].split(" ");
    if (!Validation.isGridBoundsString(lines[0])) {
        throw new Error("Invalid grid bounds. Expected two positive integers.");
    }
    const gridX = parseInt(gridXStr, 10);
    const gridY = parseInt(gridYStr, 10);
    if (gridX < 0 || gridY < 0) {
        throw new Error("Grid bounds must be positive integers.");
    }
    const gridBounds: GridBounds = { x: gridX, y: gridY };

    const roverLines = lines.slice(1); // get rid of grid coordinates line

    // Parse rovers using reduce
    const rovers = roverLines.reduce<Rover[]>((previous, line, index) => {
        if (isEven(index)) {
            // Initial position line
            if (!Validation.isInitialPositionString(line)) {
                throw new Error("Invalid initial position. Expected 'x y direction'.");
            }
            const [xStr, yStr, direction] = line.split(" ") as [string, string, Direction];

            const x = parseInt(xStr, 10);
            const y = parseInt(yStr, 10);

            if (!Validation.isValidInitialPosition(x, y, direction)) {
                throw new Error("Invalid rover initial position or direction.");
            }
            previous.push({ x, y, direction, commands: "" }); // Setup Rover object, command is the next line to be processed (set on next iteration)
        } else {
            // Commands line
            if (!Validation.isCommandString(line)) {
                throw new Error("Invalid command string");
            }

            // Valid command line, add to the previous previous entry (that's the Rover object)
            previous[previous.length - 1].commands = line;
        }
        return previous;
    }, []);

    return { gridBounds, rovers };
};
