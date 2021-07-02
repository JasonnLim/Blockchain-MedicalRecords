import web3 from './web3';
import Record from './build/Record.json';

const instance = new web3.eth.Contract(
    JSON.parse(Record.interface),
    '0x076c37FcF71071c25c66d49728cc22ccee6F2C97' //Deployed Contract Code
);

export default instance;
