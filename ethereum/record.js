import web3 from './web3';
import Record from './build/Record.json';

const instance = new web3.eth.Contract(
    JSON.parse(Record.interface),
    '0x2d9389df7243Da5823162B39a2Eb736e35B2eC9d' //Deployed Contract Code //Everytime contract code is changed, need to update this
);

export default instance;
