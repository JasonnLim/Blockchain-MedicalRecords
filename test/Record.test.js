const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledRecord = require('../ethereum/build/Record.json');

let accounts;
let record;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    record = await new web3.eth.Contract(JSON.parse(compiledRecord.interface))
        .deploy({ data: compiledRecord.bytecode })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Records', () => {
    it('can deploy record contract', () => {
        assert.ok(record.options.address);
    });

    it('can add record', async () => {
        await record.methods.setDetails(
            'John', '22', '213134', 'Flu'
        ).send({ from: accounts[0], gas: '1000000' });
    });

    it('can retrieve all record address', async () => {
        await record.methods.setDetails(
            'John', '22', '213134', 'Flu'
        ).send({ from: accounts[0], gas: '1000000' });

        const allRecords = await record.methods.getPatients().call();

        const owner = await record.methods.owner().call();

        assert.equal(allRecords, owner);
    });

    it('can search for a patient', async () => {
        await record.methods.setDetails(
            'John', '22', '213134', 'Flu'
        ).send({ from: accounts[0], gas: '1000000' });
        
        const owner = await record.methods.owner().call();

        names = await record.methods.searchPatient(owner).call();

        console.log(names[0]);
    });
});