import web3 from './web3';
import Record from './build/Record.json';

const instance = new web3.eth.Contract(
    JSON.parse(Record.interface),
    '0x97ED7e89478c68631f2B3927a3f2477dF763B960' //Deployed Contract Code //Everytime contract code is changed, need to update this
);

export default instance;
