const { RoversOrchestrator } = require("./dist/index.js");

const input = `
  
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;
// console.log("VERSION 1 ------------------------------");
// console.log(`Running v2Land with input payload: \n${input}`);
// const output = RoversOrchestrator.landOnPlateau(input);
// console.log(`\nOutput:-----\n${output}`);

console.log("VERSION 2 ------------------------------");
console.log(`Running v2Land with input payload: \n"${input}"`);
const v2Output = RoversOrchestrator.landOnPlateauV2(input);
console.log(`\nOutput:-----\n${v2Output}`);
