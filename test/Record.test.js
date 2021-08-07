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
        console.log(owner);

        names = await record.methods.searchPatient(owner).call();

        console.log(names[0]);
    });

    it('can create patient using multiple accounts', async () => {
        await record.methods.setDetails(
            'John', '22', '213134', 'Flu'
        ).send({ from: accounts[0], gas: '1000000' });

        await record.methods.setDetails(
            'Josh', '23', '213134', 'Flu'
        ).send({ from: accounts[1], gas: '1000000' });
        
        const allRecords = await record.methods.getPatients().call();
        console.log(allRecords);

        console.log(accounts[0])
        console.log(accounts[1])
    });

    it('msg.sender lel', async () => {
        const owner = await record.methods.owner().call();
        console.log(owner);

        await record.methods.setDetails(
            'Josh', '23', '213134', 'Flu'
        ).send({ from: accounts[1], gas: '1000000' });

        assert.equal(owner, accounts[1]);
    });
});