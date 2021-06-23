const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
console.log('Deleting build folder...');
fs.removeSync(buildPath);

console.log('Getting contract by path...')
const campaignPath = path.resolve(__dirname, 'contracts', 'Record.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

console.log('Compiling contract...');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath); //recreate build folder

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}