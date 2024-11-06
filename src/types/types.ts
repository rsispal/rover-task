export enum Direction {
    NORTH = "N",
    EAST = "E",
    SOUTH = "S",
    WEST = "W",
}

export type DirectionPayload = {
    x: number;
    y: number;
    direction: Direction;
};

export type Coordinates = {
    x: number;
    y: number;
};

export type GridBounds = { x: number; y: number };
export type Rover = { x: number; y: number; direction: Direction; commands: string };
