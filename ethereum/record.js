import web3 from './web3';
import Record from './build/Record.json';

const instance = new web3.eth.Contract(
    JSON.parse(Record.interface),
    '0x36A4AAF1F28652DCAe2c640Af7D1278fCF84b3F9' //Deployed Contract Code //Everytime contract code is changed, need to update this
);

export default instance;
