
export enum Direction {
    NORTH = "N",
    EAST = "E",
    SOUTH = "S",
    WEST = "W"
};

export type DirectionPayload = {
    x: number;
    y: number;
    direction: Direction;
};

export type Coordinates = { 
    x: number;
    y: number;
};