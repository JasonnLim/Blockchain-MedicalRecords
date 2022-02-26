import web3 from './web3';
import Record from './build/Record.json';

const instance = new web3.eth.Contract(
    JSON.parse(Record.interface),
    '0x2751036CAAD08Fe4EC68514d1BED4555CF32270d' //Deployed Contract Code //Everytime contract code is changed and compiled, need to update this
);

export default instance;
