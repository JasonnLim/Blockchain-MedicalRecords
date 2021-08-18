import web3 from './web3';
import Record from './build/Record.json';

const instance = new web3.eth.Contract(
    JSON.parse(Record.interface),
    '0xaFEe66f47EB7c8Bf6b903f54DA13262AF4BDb056' //Deployed Contract Code //Everytime contract code is changed, need to update this
);

export default instance;
