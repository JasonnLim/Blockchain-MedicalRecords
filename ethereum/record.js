import web3 from './web3';
import Record from './build/Record.json';

const instance = new web3.eth.Contract(
    JSON.parse(Record.interface),
    '0x39769290d510C5D186C3B4dbc61b91FC39FE4078' //Deployed Contract Code //Everytime contract code is changed, need to update this
);

export default instance;
