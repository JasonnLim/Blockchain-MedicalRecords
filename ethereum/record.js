import web3 from './web3';
import Record from './build/Record.json';

const instance = new web3.eth.Contract(
    JSON.parse(Record.interface),
    '0x1562271aF1D5E057c4159480B0DA2f4E504B9Def' //Deployed Contract Code //Everytime contract code is changed, need to update this
);

export default instance;
