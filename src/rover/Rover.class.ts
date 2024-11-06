import { computeLeftDirection, computeRightDirection, parseDirectionPayload } from "./Rover.utilities";
import { Direction } from "../types/types";

export class RoverClass {
    #xMin: number = 0;
    #yMin: number = 0;
    #xMax: number = 0;
    #yMax: number = 0;

    #x: number = 0;
    #y: number = 0;
    #direction: Direction = Direction.NORTH;

    constructor(xMax: number, yMax: number) {
        if (xMax <= 0) {
            throw new Error("xMax must be a positive number greater than 0");
        }
        if (yMax <= 0) {
            throw new Error("yMax must be a positive number greater than 0");
        }
        this.#xMax = xMax;
        this.#yMax = yMax;
    }

    public setInitialPosition(input: string): boolean {
        const { x, y, direction } = parseDirectionPayload(input);
        if (x < 0 || x > this.#xMax) {
            throw new Error("Initial x position is out of bounds");
        }
        if (y < 0 || y > this.#yMax) {
            throw new Error("Initial y position is out of bounds");
        }

        this.#x = x;
        this.#y = y;
        this.#direction = direction;
        return true;
    }

    public setInitialPositionValues(x: number, y: number, direction: Direction): boolean {
        if (x < 0 || x > this.#xMax) {
            throw new Error("Initial x position is out of bounds");
        }
        if (y < 0 || y > this.#yMax) {
            throw new Error("Initial y position is out of bounds");
        }

        this.#x = x;
        this.#y = y;
        this.#direction = direction;
        return true;
    }

    public direct(input: string) {
        const commands = input.split("");
        for (let i = 0; i < commands.length; i++) {
            const command = commands[i];

            switch (command) {
                case "L": {
                    this.#direction = computeLeftDirection(this.#direction);
                    break;
                }
                case "R": {
                    this.#direction = computeRightDirection(this.#direction);
                    break;
                }
                case "M": {
                    switch (this.#direction) {
                        case Direction.NORTH:
                            if (this.#y + 1 > this.#yMax) {
                                throw new Error(`MOVE to NORTH is out of bounds (instruction ${i + 1} in ${input})`);
                            }
                            this.#y++;
                            break;
                        case Direction.WEST:
                            if (this.#x - 1 < this.#xMin) {
                                throw new Error(`MOVE to WEST is out of bounds (instruction ${i + 1} in ${input})`);
                            }
                            this.#x--;
                            break;
                        case Direction.SOUTH:
                            if (this.#y - 1 < this.#yMin) {
                                throw new Error(`MOVE to SOUTH is out of bounds (instruction ${i + 1} in ${input})`);
                            }
                            this.#y--;
                            break;
                        case Direction.EAST:
                            if (this.#x + 1 > this.#xMax) {
                                throw new Error(`MOVE to EAST is out of bounds (instruction ${i + 1} in ${input})`);
                            }
                            this.#x++;
                            break;
                    }
                    break;
                }
                default: {
                    throw new Error(`Unsupported direction instruction: ${command}`);
                }
            }
        }

        return `${this.#x} ${this.#y} ${this.#direction}`;
    }
}
