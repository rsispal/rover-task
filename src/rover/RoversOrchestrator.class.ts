import { Direction } from "../types/types";
import { RoverClass } from "./Rover.class";
import { isEven, isOdd, parseCoordinates, parseRoverData } from "./Rover.utilities";

export class RoversOrchestrator {
    /**
     * @brief Method used to run test cases through for multiple rovers
     * @param input (string) - test input from specification
     * @returns Rover positions
     */
    static landOnPlateau(input: string) {
        // Break down bulk input into lines and filter out lines inferred as instructions
        const commands = input.split("\n").filter((s) => s.length);

        if (commands.length % 2 == 0) {
            throw new Error(
                "Invalid input: please ensure coordinates are provided, followed by the initial position and commands for each rover"
            );
        }

        const coordinates = parseCoordinates(commands[0]);

        let rc: RoverClass;

        return commands
            .map((s, i) => {
                if (i == 0) {
                    return ""; // Skip first line
                } else if (isOdd(i)) {
                    // Odd indexed line - initial position command
                    rc = new RoverClass(coordinates.x, coordinates.y);
                    rc.setInitialPosition(s);
                } else if (isEven(i)) {
                    // Even indexed line - directions command
                    return rc.direct(s);
                }
            })
            .filter((s) => s?.length)
            .join("\n");
    }

    static landOnPlateauV2(input: string) {
        try {
            const result = parseRoverData(input);
            console.log(result);

            return result.rovers
                .map((rover, i) => {
                    const rc = new RoverClass(result.gridBounds.x, result.gridBounds.y);
                    rc.setInitialPositionValues(rover.x, rover.y, rover.direction);
                    // Even indexed line - directions command
                    return rc.direct(rover.commands);
                })
                .join("\n");
        } catch (error) {
            console.error(error);
        }
    }
}
