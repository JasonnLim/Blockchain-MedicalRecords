import web3 from './web3';
import Record from './build/Record.json';

const instance = new web3.eth.Contract(
    JSON.parse(Record.interface),
    '0xe591e92B9C07769c7A9cc358e87697973F7FC770' //Deployed Contract Code //Everytime contract code is changed, need to update this
);

export default instance;
