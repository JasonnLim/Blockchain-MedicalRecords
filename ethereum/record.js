import web3 from './web3';
import Record from './build/Record.json';

const instance = new web3.eth.Contract(
    JSON.parse(Record.interface),
    '0x5A30Fc6613Bd59C48107bC2e57f1C71bD9dE68B2' //Deployed Contract Code
);

export default instance;
