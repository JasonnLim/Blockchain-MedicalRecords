import web3 from './web3';
import Record from './build/Record.json';

const instance = new web3.eth.Contract(
    JSON.parse(Record.interface),
    '0xAdf935132a6633bA40802765C1B1aBeCbB8e8351' //Deployed Contract Code //Everytime contract code is changed and compiled, need to update this
);

export default instance;

//Whenever there is a change in Solidity code, use this few commands
//Step 1: cd ethereum
//Step 2: node compile.js
//Step 3: node deploy.js
//Step 4: Paste the contract deployed address above