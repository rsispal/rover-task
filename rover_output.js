const {RoversOrchestrator} = require('./dist/index.js');


const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

console.log(`Running landOnPlateau with input payload: \n${input}`);
const output  = RoversOrchestrator.landOnPlateau(input);
console.log(`\nOutput:-----\n${output}`);