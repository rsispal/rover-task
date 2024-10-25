import { RoversOrchestrator } from "../../src/rover/RoversOrchestrator.class";


const testCaseInput = `5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM`;
const testCaseOutput = `1 3 N\n5 1 E`;

describe("RoversOrchestrator", () => {
    describe("landOnPlateau", () => {    
        it("Should return expected output from supplied test cases", () => {
            expect(RoversOrchestrator.landOnPlateau(testCaseInput)).toEqual(testCaseOutput);
        });
    });
});
